import React, { Component } from "react";
import "./Conseils.css";
import axios from "axios";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { getagents } from "../../Redux/ajentsAction"; 
import { connect } from "react-redux";

class FormulaireConseil extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      messages: {
        alpha                : '⚠ Le champ :attribute ne peut contenir que des lettres.',
        email                : '⚠ Le champ :attribute doit êre une adresse email valide.',
        required             : '⚠ Le champ :attribute est requis.',
        size                 : '⚠ Le champ :attribute doit être :size:type.',
        max                  : 'Le champ :attribute ne doit pas dépasser :max:type.',
        min                  : 'Le champ :attribute doit au moins être :min:type.',
      },
      autoForceUpdate: this
    });
    this.state = {
      nom: "",
      tel: "",
      agentId:"",
      email: "",
      message:"",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.props.getagents();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  openModal() {
    this.setState({
        visible : true
    });
}

closeModal(e) {
    this.setState({
        visible : false,  
    });
    window.location.reload();
}

  onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
    const conseil = {
      nom: this.state.nom,
      tel: this.state.tel,
      agentId: this.state.agentId,
      email: this.state.email,
      message: this.state.message
    };

    axios
      .post("http://localhost:8080/conseils/addconseils", conseil)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
      this.openModal();
 
     }
     else {
      e.preventDefault();
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    
  }
  }

  render() {
    const  {agents} = this.props

    return (
      <div className="col-sm-6 bottom40">
        <h2 className="text-uppercase bottom20">Contact Agent</h2>
        <form className="callus"onSubmit={this.onSubmit}>
          <label>
            <h4>Nom & prénom :</h4>
          </label>
          <div className="form-group">
            <input
            valid={this.validator.fieldValid('Nom & prénom')} 
              invalid={!this.validator.fieldValid('Nom & prénom ')}   
              type="text"
              className="form-control"
              placeholder="Nom & prénom"
              style={{ width: " 500px;" }}
              value={this.state.nom}
              onChange={this.onChange}
              name="nom"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Nom & prénom ')}>
            {this.validator.message(' Nom & prénom  ', this.state.nom, 'required|min:6|max:22')}</FormFeedback>
          </div>
          <label>
            <h4>Téléphone :</h4>
          </label>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              placeholder="Téléphone"
              style={{ width: " 500px;" }}
              value={this.state.tel}
              onChange={this.onChange}
              name="tel"
            />
          </div>
          <label>
            <h4>Email :</h4>
          </label>
          <div className="form-group">
            <input
            valid={this.validator.fieldValid('Email')} 
            invalid={!this.validator.fieldValid('Email ')} 
              type="email"
              className="form-control"
              placeholder="Email"
              style={{ width: " 500px;" }}
              value={this.state.email}
              onChange={this.onChange}
              name="email"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  email ')}>{this.validator.message('email', this.state.email, 'required|email')}</FormFeedback>
          </div>
          <label>
            <h4>Non d'agent :</h4>
          </label>
          <div className="form-group">
            <select 
            valid={this.validator.fieldValid('nom Agent')} 
            invalid={!this.validator.fieldValid('nom Agent ')}  
            id="pet-select" style={{ width: " 554px" }}  
            value={this.state.agentId}
            onChange={this.onChange}
            name="agentId">
              <option value="">
                s'il vous plaît choisissez un agent pour vous aider
              </option>
              {agents.data ? agents.data.result.map((el, index) => (
          <option key={index} value={el._id} > {el.nom} </option>
        )):false}
            </select>
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  nom Agent ')}>{this.validator.message('nom Agent', this.state.agentId, 'required')}</FormFeedback>

          </div>
          <label>
            <h4>Message :</h4>
          </label>
          <div className="form-group">
            <textarea
            valid={this.validator.fieldValid('Message')} 
            invalid={!this.validator.fieldValid('Message ')} 
              className="form-control"
              placeholder="Message"
              defaultValue={""}
              style={{ width: " 500px;" }}
              value={this.state.message}
              onChange={this.onChange}
              name="message"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Message')}>
            {this.validator.message(' Message ', this.state.message, 'required|min:50')}</FormFeedback>
          </div>

          <button
          style={{marginLeft:"198px"}}
            type="submit"
            className="btn-blue uppercase border_radius"
            defaultValue="Envoyer"
          >
            Envoyer
          </button>
          <Modal visible={this.state.visible} width="400" height="300" effect="fadeInRight" onClickAway={() => this.closeModal()}>
          <div>
         
              <h1 style={{color:"#e60505"}}><i className="far fa-hand-peace">félicitations 🎉</i></h1>
              <h4 style={{textAlign:"center",color:"#000000",marginTop:" 63px"}}>votre demande a été envoyée avec succès</h4>
              <a href="javascript:void(0);" onClick={() => this.closeModal()}><button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "278px"}}>Fermer</button></a>
          </div>
      </Modal>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    agents: state.agentsReducer.agents, 
  };
};
export default connect(
  mapStateToProps,
  {getagents }
) (FormulaireConseil);
