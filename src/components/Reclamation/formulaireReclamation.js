import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import "./reclamation.css"
class FormulaireReclamation extends Component {
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
      titre: "",
      nom:"",
      email: "",
      description_rec:"",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        visible : false
       
    }); 
     window.location.reload();
}
  onSubmit(e) {
    e.preventDefault()
    if (this.validator.allValid()) {
    const reclamation = {
      titre: this.state.titre,
      nom: this.state.nom,
      email: this.state.email,
      description_rec: this.state.description_rec
    };

    axios
      .post("http://localhost:8080/reclamations/addReclamation", reclamation)
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
    return (
      <div className="row">
        <form className="callus clearfix border_radius"  onSubmit={this.onSubmit}>
          <div className="single-query form-group">
            <label>Titre de réclamation :</label>
            <input
             valid={this.validator.fieldValid('Titre')} 
             invalid={!this.validator.fieldValid('Titre ')} 
              type="text"
              className="single-query keyword-input"
              placeholder="Titre de réclamation"
              value={this.state.titre}
              onChange={this.onChange}
              name="titre"
            />
             <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Titre')}>
            {this.validator.message(' Titre ', this.state.titre, 'required|min:6|max:50')}</FormFeedback>
          </div>
          <div className="single-query form-group">
            <label>Votre Nom :</label>
            <input
            
              valid={this.validator.fieldValid('Nom')} 
              invalid={!this.validator.fieldValid('Nom')}  
              type="text"
              className="single-query keyword-input  reclamation" id="rec"
              placeholder="Votre nom"
              value={this.state.nom}
              onChange={this.onChange}
              name="nom"
              style={{    marginBottom: "33px"}}
            />
              <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('Nom')}>
{this.validator.message('Nom', this.state.nom, 'required|min:6|max:22')}
</FormFeedback>
          </div>
          <div className="form-group">
          <label>Adresse Email :</label>
          <input
            valid={this.validator.fieldValid('Email')} 
            invalid={!this.validator.fieldValid('Email ')}   
              type="text"
              className="single-query keyword-input"
              placeholder="Titre de réclamation"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  email ')}>{this.validator.message('email', this.state.email, 'required|email')}
            </FormFeedback>
             </div>
          <div className="single-query form-group top10">
            <label>Message</label>
            <textarea
             valid={this.validator.fieldValid('Message')} 
             invalid={!this.validator.fieldValid('Message ')}
              type="text"
              className="keyword-input"
              placeholder="Message"
              style={{ width: "350px" }}
              value={this.state.description_rec}
              onChange={this.onChange}
              name="description_rec"
            />
            <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Message')}>
            {this.validator.message(' Message ', this.state.description_rec, 'required|min:50')}
            </FormFeedback>
          </div>
          {/* <button type="Envoyer" className="btn-blue border_radius top15">
            Envoyer
          </button> */}
            <button 
            type="submit"
            className="btn-blue uppercase btn-blue border_radius top15"
            value="Envoyer"  
            >Soumettre </button>   
              <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                   
                        <h1 style={{marginTop: "55px",color:"#e60505",marginRight: "-11px"}}><i className="far fa-hand-peace">félicitations 🎉</i></h1>
                        <h4 style={{textAlign:"center",color:"#000000",marginTop:" 63px"}}>votre demande a été envoyée avec succès</h4>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}><button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "149px"}}>Fermer</button></a>
                    </div>
                </Modal>
        </form>
      </div>
    );
  }
}

export default FormulaireReclamation;
