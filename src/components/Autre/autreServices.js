import React, { Component } from "react";
import "./Autre.css";
import axios from "axios";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { getagents } from "../../Redux/ajentsAction"; 
import { connect } from "react-redux";

class AutreServices extends Component {
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
      email: "",
      agentId: "",
      titre: "",
      description: "",
      visible:false,
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
   e.preventDefault()
    if (this.validator.allValid()) {
 
    const autre = {
      nom: this.state.nom,
      email: this.state.email,
      agentId: this.state.agentId,
      titre: this.state.titre,
      description: this.state.description,
      
    };
  
    axios
      .post("http://localhost:8080/autres/add", autre)
      // .then(res => console.log(res.data))
      // .catch(err => console.log(err.response.data));
      .then(function(response) {
        console.log(response);
        if (response.data.code === 200) {
          this.openModal()
            console.log("registration successfull");
        }
        else {
            console.log("some error ocurred", response.data.code);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
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
       
        <h3>Informations Perssonnelles</h3>
        <form className="callus" onSubmit={this.onSubmit} style={{marginTop: "25px"}}>
          <div className="form-group -animated">


            <input
              valid={this.validator.fieldValid('Nom & prénom')} 
              invalid={!this.validator.fieldValid('Nom & prénom ')}      
              type="text"
              className="form-control"
              placeholder="Nom & prénom "
              style={{
                backgroundColor: "#ffffff0a",
                fontSize: "18px",
                color: "white"
              }}
              value={this.state.nom}
              onChange={this.onChange}
              name="nom"
  
             
            /> 
                  <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Nom & prénom ')}>
{this.validator.message(' Nom & prénom  ', this.state.nom, 'required|min:6|max:22')}</FormFeedback>

          </div>

          <div className="form-group">
            <input
              valid={this.validator.fieldValid('Email')} 
              invalid={!this.validator.fieldValid('Email ')}   
              type="text"
              className="form-control"
              placeholder="Adrresse Email"
              style={{
                backgroundColor: "#ffffff0a",
                fontSize: "18px",
                color: "white"
              }}
              value={this.state.email}
              onChange={this.onChange}
              name="email"
            />  
              <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  email ')}>{this.validator.message('email', this.state.email, 'required|email')}</FormFeedback>
          </div>
          <div className="form-group">
            <select
            valid={this.validator.fieldValid('nom Agent')} 
            invalid={!this.validator.fieldValid('nom Agent ')}  
              id="pet-select"
              style={{
                backgroundColor: "#ffffff0a",
                fontSize: "18px",
                color: "white",
                width: "588px"
              }}
              value={this.state.agentId}
              onChange={this.onChange}
              name="agentId"
            >
              <option value="" style={{backgroundColor:"#464a4b"}}>
                s'il vous plaît choisissez un agent pour vous aider
              </option>
              {agents.data ? agents.data.result.map((el, index) => (
          <option key={index} value={el._id} style={{backgroundColor:"#464a4b"}}> {el.nom} </option>
        )):false}
            </select>
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  nom Agent ')}>{this.validator.message('nom Agent', this.state.agentId, 'required')}</FormFeedback>
          </div>
          <div className="form-group">
            <input
               valid={this.validator.fieldValid('Titre')} 
               invalid={!this.validator.fieldValid('Titre ')} 
              type="text"
              className="form-control"
              placeholder="Titre"
              style={{
                backgroundColor: " #ffffff0a",
                fontSize: "18px",
                color: "white"
              }}
              value={this.state.titre}
              onChange={this.onChange}
              name="titre"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Titre')}>
            {this.validator.message(' Titre ', this.state.titre, 'required|min:6|max:50')}</FormFeedback>
          </div>
          <div className="form-group">
            <textarea
            valid={this.validator.fieldValid('Description')} 
            invalid={!this.validator.fieldValid('Description ')} 
              className="form-control"
              placeholder="Description"
              style={{
                backgroundColor: " #ffffff0a",
                fontSize: "18px",
                color: "white"
              }}
              value={this.state.description}
              onChange={this.onChange}
              name="description"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Description')}>
            {this.validator.message(' Description ', this.state.description, 'required|min:50')}</FormFeedback>
          </div>
          {/* <button
            type="submit"
            className="btn-blue uppercase border_radius"
            defaultValue="Envoyer"
          >
         
            Soumettre
          </button>   
           */}
              <button 
            type="submit"
            className="btn-blue uppercase border_radius"
            value="Envoyer"  
            >Soumettre </button>   
              <Modal visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
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
)(AutreServices);
