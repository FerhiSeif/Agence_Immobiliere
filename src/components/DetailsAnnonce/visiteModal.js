import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
class DetailsAnnonce extends Component {

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
          numeric              : '⚠ Le champ :attribute doit être un numero.',
          phone                :'⚠ Le champ :attribute doit être un format de numéro de téléphone valide. Ex. 20-555-123 '
  
        },
        autoForceUpdate: this
      });
      this.state = {
        statut: "",
        visible:false,
        nom: "",
        tel: "",
        email: "",
        prixPropose:"",
      };
      this.onChange = this.onChange.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.open = this.open.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
  

  
    openModal() {
      this.setState({
          visible : true
      });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  closeModal(e) {
      this.setState({
          visible : false,  
      });
      window.location.reload();
  }
    open(e) {
       e.preventDefault()
       console.log("modal test1")
       this.openModal()
       
  }
  onSubmit(e) {
     e.preventDefault();
    if (this.validator.allValid()) {
      console.log("modal test2")
    const negocier = {
      nom: this.state.nom,
      tel: this.state.tel,
      nomAgent: this.state.nomAgent,
      email: this.state.email,
      prixPropose: this.state.prixPropose
    };
  
  
  axios
  .post("http://localhost:8080/negocierPrix/add", negocier)
  .then(res => console.log(res.data))
  .catch(err => console.log(err.response.data));
  alert("félicitations 🎉 votre demande a été envoyée avec succès ")
  this.closeModal()
  
  }
     else {
      console.log("modal test3")
      e.preventDefault();
      console.log("modal test4")
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    
  }
  }
    render() {
      
      return (


      )}
    }