import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import { Input,FormFeedback } from 'reactstrap';
class ContactItem extends Component {
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
      visible:false,
      nom: "",
      tel: "",
      email: "",
      message:"",
        };
    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal=this.closeModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
   
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
    closeModal(e) {
       this.setState({
          visible:false,
          nom: "",
          tel: "",
          email: "",
          message:"",
        });
    }

  openModal() {
    this.setState({
        visible : true
    });
}
onSubmit(e){
   e.preventDefault()
  if (this.validator.allValid()) {
   console.log("validation test")
  const contact = {
      nom: this.state.nom2,
      tel: this.state.tel2,
      email: this.state.email2,
      message: this.state.message
    };
 
     axios
    .post("http://localhost:8080/mails/sendEmail", contact)
    .then(res => {
              alert("email envoye");
              let statut = 200;
              this.setState({
    
                      nom2: "",
                      tel2: "",
                      email2: "",
                    message:"",
     
             });

              return statut;
    })
    .catch(err => console.log(err.response.data));
  
  

  }
 else {
 
    e.preventDefault();
    this.validator.showMessages();
    this.forceUpdate();
 
  }


}

  render() {

    return (
 <div className="row">
      
      <form action="#" className="callus" onSubmit={this.onSubmit}>
        <div className="col-md-12">
          <div className="single-query form-group">
            <label> Nom </label>

                        <input
                          valid={this.validator.fieldValid('Nom & prénom')} 
                          invalid={!this.validator.fieldValid('Nom & prénom ')}  
                          type="text"
                          className="form-control"
                          placeholder="Nom"
                          value={this.state.nom2}
                          onChange={this.onChange}
                          name="nom2"
                        />
                        <FormFeedback  style={{color:"red", marginLeft: "17px"}} 
                        invalid={!this.validator.fieldValid('  nom2 ')}>
                        {this.validator.message('nom2', this.state.nom2, 'required')}</FormFeedback>

          </div>
          <div className="single-query form-group">
            <label> Teléphone </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Téléphone"
                           value={this.state.tel2}
                          onChange={this.onChange}
                          name="tel2"
                        />
          </div>
          <div className="single-query form-group">
          <label> Email </label>
            <input
                          valid={this.validator.fieldValid('Email')} 
                          invalid={!this.validator.fieldValid('Email ')} 
                          type="email"
                          className="form-control"
                          placeholder="Email"
                           value={this.state.email2}
                          onChange={this.onChange}
                          name="email2"
                        />
                       <FormFeedback  style={{color:"red", marginLeft: "17px"}}
                         invalid={!this.validator.fieldValid('  email2 ')}>
                         {this.validator.message('email2', this.state.email2, 'required|email')}
                         </FormFeedback>

          </div>
          <div className="single-query form-group">
            <label> Message </label>

                        <textarea
                          className="form-control"
                          placeholder="Message"
                          defaultValue={""}
                          value={this.state.message}
                          onChange={this.onChange}
                          name="message"
                        />
          </div>
              <input type="submit" defaultValue="Envoyer" className="btn-blue" style={{marginTop:"30px"}}/>
        </div>
      </form>
  
       </div>
    );
  }
}

export default ContactItem;
