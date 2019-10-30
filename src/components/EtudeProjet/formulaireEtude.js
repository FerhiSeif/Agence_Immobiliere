import React, { Component } from "react";
import axios from "axios";
import "./EtudeProjet.css";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
class FormulaireEtude extends Component {
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
      tel: "",
      description: "",
      titre: "",
      budget: "",
      localisation: "",
      description2: "",
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
      visible : false,  
  });
  window.location.reload();
}

  onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
    const etudeProjet = {
      nom: this.state.nom,
      email: this.state.email,
      tel: this.state.tel,
      description: this.state.description,
      titre: this.state.titre,
      budget: this.state.budget,
      localisation: this.state.localisation,
      description2: this.state.description2
    };

    axios
      .post("http://localhost:8080/etudeProjets/add", etudeProjet)
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
        <div className="col-sm-6 bottom40">
          <h3>Informations Perssonnelles</h3>
          <form className="callus" style={{ paddingTop: "25px" }} onSubmit={this.onSubmit}>
            <div className="form-group">
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
                type="adress"
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
              <input
                type="tel"
                className="form-control"
                placeholder="Téléphone "
                style={{
                  backgroundColor: " #ffffff0a",
                  fontSize: "18px",
                  color: "white"
                }}
                value={this.state.tel}
                onChange={this.onChange}
                name="tel"
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Proféssion & Description"
                style={{
                  backgroundColor: " #ffffff0a",
                  fontSize: "18px",
                  color: "white"
                }}
                
                value={this.state.description}
                onChange={this.onChange}
                name="description"
              />
            </div>
          </form>
        </div>
        <div className="col-sm-6 bottom40">
          <h3>Votre Projet</h3>

          <form className="callus" style={{ paddingTop: "25px" }}onSubmit={this.onSubmit}>
          <div className="form-group">
              <input
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
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Budget"
                style={{
                  backgroundColor: " #ffffff0a",
                  fontSize: "18px",
                  color: "white"
                }}
                value={this.state.budget}
                onChange={this.onChange}
                name="budget"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Localisation"
                style={{
                  backgroundColor: " #ffffff0a",
                  fontSize: "18px",
                  color: "white"
                }}
                value={this.state.localisation}
                onChange={this.onChange}
                name="localisation"
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Description du projet"
                style={{
                  backgroundColor: " #ffffff0a",
                  fontSize: "18px",
                  color: "white"
                }}
                value={this.state.description2}
                onChange={this.onChange}
                name="description2"
              />
            </div>
            <button
            type="submit"
            className="btn-blue uppercase border_radius"
            defaultValue="Envoyer"
            style={{ width: "158px",
              marginTop: "23px",
            marginLeft:"-627px"}}
          >
            Soumettre
          </button> 
          
          <Modal visible={this.state.visible} width="400" height="300"  effect="fadeInRight" onClickAway={() => this.closeModal()}>
          <div>
         
          
          <h4 style={{color:"black"}}>Non d'agent :</h4>
          <div className="form-group">
          <select 
          valid={this.validator.fieldValid('nom Agent')} 
          invalid={!this.validator.fieldValid('nom Agent ')}  
          id="pet-select"   value={this.state.nomAgent}
            onChange={this.onChange}
            name="nomAgent">
            <option value="">
              s'il vous plaît choisissez un agent pour vous aider
            </option>
            <option value="dog">agent1</option>
            <option value="cat">agent2</option>
            <option value="hamster">agent3</option>
          </select>
          

        </div>
       
              <a href="javascript:void(0);" onClick={() => this.closeModal()}><button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "278px"}}>Fermer</button></a>
          </div>
      </Modal>
     
          </form>
        </div>
      </div>
    );
  }
}

export default FormulaireEtude;
