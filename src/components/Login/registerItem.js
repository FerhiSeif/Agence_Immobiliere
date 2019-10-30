import React, { Component } from "react";
import { Link,withRouter} from "react-router-dom";
import axios from "axios";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { Form, Checkbox } from 'semantic-ui-react'
import "./register.css"
const firebase = require("firebase");
 
class Register extends Component {
  constructor(props) {
    super(props);
  this.validator = new SimpleReactValidator({
    messages: {
      alpha                : '⚠ Le champ :attribute ne peut contenir que des lettres.',
      email                : '⚠ Le champ :attribute doit êre une adresse email valide.',
      required             : '⚠ Le champ :attribute est requis.',
      size                 : '⚠ Le champ :attribute doit être :size:type.',
      max                  : '⚠ Le champ :attribute ne doit pas dépasser :max:type.',
      min                  : '⚠ Le champ :attribute doit au moins être :min:type.',
      phone                : '⚠ Le champ :attribute doit être un numéro de téléphone valide.',
      confirmed            : '⚠ Le champ :attribute  ne correspond pas au même mot de passe que vous avez  tapé.  '
    },
    autoForceUpdate: this
  });
    this.state = {
      nom: "",
      adresse: "",
      tel: "",
      email: "",
      motDePasse: "",
      motDePasse2: "",
      errors: {},
      visible:false,
      role:[],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


   handleChange = (e, { value }) => this.setState({ value })
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

  async onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
    const client = {
      nom: this.state.nom,
      adress: this.state.adresse,
      tel: this.state.tel,
      email: this.state.email,
      motDePasse: this.state.motDePasse,
      motDePasse2: this.state.motDePasse2,
      
    };
    if(this.state.motDePasse !== this.state.motDePasse2){
       return
    }

    await axios
      .post("http://localhost:8080/clients/register", client)
      .then(response=>{

        if (response.status == 200) {
          console.log(response.data)
          this.openModal();
           this.props.history.push('/login')
      }
      })
   
      .catch(err => alert("email already exist"));
      
    }
    else {
     e.preventDefault();
     this.validator.showMessages();

 
     // rerender to show messages for the first time
     this.forceUpdate();
   }

   

 //////////////////////////////////////////////////////////////////////////
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.motDePasse)
      .then(
        authRes => {
          const client = {
            email: authRes.user.email,
            friends: [],
            messages: []
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(client)
            .then(
              () => {
                this.props.history.push("/login");
              },
              dbErr => {
                console.log("Failed to add user to the database: ", dbErr);
                this.setState({ signupError: "Failed to add user" });
              }
            );
        },
        authErr => {
          console.log("Failed to create user: ", authErr);
          this.setState({ signupError: "Failed to add user" });
        }
      );
    /////////////////////////////////////////////////////////////////////////////////////////////  
  }

  render() {
    
 
    return (
      <div className="agent-p-form">
        <form className="callus clearfix" onSubmit={this.onSubmit}>
          <div className="single-query col-sm-12 form-group">
            <label>Nom && prenom </label>
            <input
              valid={this.validator.fieldValid('Nom& prénom')} 
              invalid={!this.validator.fieldValid('Nom & prénom ')}      
              type="text"
              className="keyword-input"
              placeholder="Nom && prenom"
              value={this.state.nom}
              onChange={this.onChange}
              name="nom"
            />
              <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Nom & prénom ')}>
{this.validator.message(' Nom & prénom  ', this.state.nom, 'required|min:6|max:22')}</FormFeedback>
          </div>
          <div className="single-query col-sm-12 form-group">
            <label>Adresse</label>
            <input
              type="text"
              className="keyword-input"
              placeholder="Adresse"
              value={this.state.adress}
              onChange={this.onChange}
              name="adresse"
            />
          </div>
          <div className="single-query col-sm-12 form-group">
            <label>Tel</label>
            <input
              type="text"
              className="keyword-input"
              placeholder="Tel"
              value={this.state.tel}
              onChange={this.onChange}
              name="tel"
            />
          </div>
          <div className="single-query col-sm-12 form-group">
            <label>Email Address</label>
            <input
            input
            valid={this.validator.fieldValid('Email')} 
            invalid={!this.validator.fieldValid('Email ')}   
              type="text"
              className="keyword-input"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              error={this.state.error || null}
            />
              <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  email ')}>{this.validator.message('email', this.state.email, 'required|email')}</FormFeedback>
          </div>
          <div className="single-query col-sm-12 form-group">
            <label>Mot De Passe</label>
            <input
             valid={this.validator.fieldValid('Mot De Passe')} 
             invalid={!this.validator.fieldValid('Mot De Passe ')}  
              type="password"
              className="keyword-input"
              placeholder="Password"
              value={this.state.motDePasse}
              onChange={this.onChange}
              name="motDePasse"
            />
                <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Mot De Passe')}>
{this.validator.message(' Mot De Passe ', this.state.motDePasse, 'required|min:6|max:22')}</FormFeedback>
          </div>
          <div className="single-query col-sm-12 form-group">
            <label> Confirmer Mot De Passe</label>
            <input
            valid={this.validator.fieldValid('Confirmer Mot De Passe')} 
            invalid={!this.validator.fieldValid('Confirmer Mot De Passe ')}  
              type="password"
              className="keyword-input"
              placeholder="Confirm  Password"
              value={this.state.motDePasse2}
              onChange={this.onChange}
              name="motDePasse2"
            />
                <FormFeedback  style={{color:"red"}}  invalid={!this.validator.fieldValid('  Confirmer Mot De Passe')}>
{this.validator.message(' Confirmer Mot De Passe ', this.state.motDePasse2, 'required|')}</FormFeedback>
        {this.state.motDePasse !== this.state.motDePasse2 && this.state.motDePasse2 !=="" && <span styel={{color : "red"}}> Password validation error </span>}
          </div>
          <div className="search-form-group white col-sm-12 form-group text-left">
        
      
            
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 text-center">
            <div className="query-submit-button">
              <input
                type="submit"
                defaultValue="Creat an Account"
                className="btn-slide"
              />
               <Modal visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                   
                        <h1 style={{color:"#e60505"}}><i className="far fa-hand-peace">félicitations 🎉</i></h1>
                        <h4 style={{textAlign:"center",color:"#000000",marginTop:" 63px"}}>votre compte a été créé avec succès</h4>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}><button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "278px"}}>Fermer</button></a>
                    </div>
                </Modal>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter (Register);
