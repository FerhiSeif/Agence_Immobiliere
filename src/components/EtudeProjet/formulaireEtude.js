import React, { Component } from "react";
import axios from "axios";
import "./EtudeProjet.css";
import Modal from 'react-awesome-modal';
import { Input, FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { villes, categories, numbers } from "./../CreerAnnonce/static";
import { getagents } from "../../Redux/ajentsAction"; 
import { connect } from "react-redux";

class FormulaireEtude extends Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                alpha: '⚠ Le champ :attribute ne peut contenir que des lettres.',
                email: '⚠ Le champ :attribute doit êre une adresse email valide.',
                required: '⚠ Le champ :attribute est requis.',
                size: '⚠ Le champ :attribute doit être :size:type.',
                max: 'Le champ :attribute ne doit pas dépasser :max:type.',
                min: 'Le champ :attribute doit au moins être :min:type.',
                numeric: '⚠ Le champ :attribute doit être un numero.',
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
            region: "",
            description2: "",
            statut: "",
            agentId: "",
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
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    openModal() {
        console.log("open")
        this.setState({
            visible: true
        });
    }

    closeModal(e) {

        this.setState({
            visible: false,
        });
        window.location.reload();
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {

            const etudeProjet = {
                nom: this.state.nom,
               prenom: this.state.prenom,
                email: this.state.email,
                tel: this.state.tel,
                description: this.state.description,
                titre: this.state.titre,
                budget: this.state.budget,
                region: this.state.region,
                description2: this.state.description2,
                statut: this.state.statut,
                agentId: this.state.agentId
            };
            console.log("etudeProjet",this.state.etudeProjet)
            axios
                .post("http://localhost:8080/etudeProjets/add", etudeProjet)
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
             
                 
           
            
        } else {
            e.preventDefault();
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }
    }

    render() {
        const  {agents} = this.props
        
      return ( 
       <div className = "row" >
         <div className = "col-sm-6 bottom40" >
          <h3 > Informations Perssonnelles </h3>
          <form className = "callus"
                style = {{paddingTop: "25px"}}
                onSubmit = { this.onSubmit} >
           <div className = "form-group" >
             <input valid = { this.validator.fieldValid('Nom & prénom') }
                invalid = {!this.validator.fieldValid('Nom & prénom ') }
                type = "text"
                className = "form-control"
                placeholder = "Nom"
                style = {{backgroundColor: "#ffffff0a",
                        fontSize: "18px",
                        color: "white"}}
                value = { this.state.nom }
                onChange = { this.onChange }
                name = "nom" />
             <FormFeedback style = {{ color: "red" }}
              invalid = {!this.validator.fieldValid('  Nom') } >
               { this.validator.message(' Nom ', this.state.nom, 'required|max:22') } 
             </FormFeedback> 
           </div> 
           <div className = "form-group" >
             <input type = "text"
                className = "form-control"
                placeholder = " Prénom "
                style = {{backgroundColor: "#ffffff0a",
                        fontSize: "18px",
                        color: "white"}}
                value = { this.state.prenom }
                onChange = { this.onChange }
                name = "prénom" />
                </div>
           <div className = "form-group" >
            <input valid = { this.validator.fieldValid('Email') }
                invalid = {!this.validator.fieldValid('Email ') }
                type = "adress"
                className = "form-control"
                placeholder = "Adrresse Email"
                style = {{backgroundColor: "#ffffff0a",
                        fontSize: "18px",
                        color: "white"} }
                value = { this.state.email }
                onChange = { this.onChange }
                name = "email"
                />
            <FormFeedback style = {
                { color: "red" }
            }
            invalid = {!this.validator.fieldValid('  email ') } > 
            { this.validator.message('email', this.state.email, 'required|email') } 
            </FormFeedback>

           </div> 
          <div className = "form-group" >
            <input type = "tel"
                className = "form-control"
                placeholder = "Téléphone "
                style = {
                    {
                        backgroundColor: " #ffffff0a",
                        fontSize: "18px",
                        color: "white"
                    }
                }
                value = { this.state.tel }
                onChange = { this.onChange }
                name = "tel" />
          </div>
         <div className = "form-group" >
            <textarea className = "form-control"
            placeholder = "Proféssion & Description"
            style = {
                {
                    backgroundColor: " #ffffff0a",
                    fontSize: "18px",
                    color: "white"
                }
            }

            value = { this.state.description }
            onChange = { this.onChange }
            name = "description" />
         </div>
        </form> 
       </div> 
       <div className = "col-sm-6 bottom40" >
         <h3> Votre Projet </h3>
         <form className = "callus"
            style = {
                { paddingTop: "25px" }
            }
            onSubmit = {this.onSubmit} >

            <div className = "form-group" >
              <select valid = { this.validator.fieldValid('Statut') }
                        invalid = {!this.validator.fieldValid('Statut ') }
                        name = "statut"
                        value = { this.state.statut }
                        onChange = { this.onChange }
                        style = {
                            { width: "601px", backgroundColor: "transparent", fontSize: "18px", color: "white" } } >
                        <option className = "active" >
                        Choisir un le statut de votre projet </option>
                        <option className = "active"
                        value = "vente"
                        style = {
                    { color: "black" } } >
                        Vente 
                        </option>
                        <option className = "active"
                        value = "achat"
                        style = {
                            { color: "black" } } >
                        Achat
                        </option> 
                        <option className = "active"
                        value = "location"
                        style = {
                            { color: "black" } } >
                        Location
                        </option> 
                        <option className = "active"
                        value = "autres"
                        style = {
                            { color: "black" } } >
                        Autres
                        </option>
            </select>
            <FormFeedback style = {
                { color: "red" }
            }
            invalid = {!this.validator.fieldValid(' Statut ') } > 
            { this.validator.message(' Statut  ', this.state.statut, 'required') } 
            </FormFeedback>
        </div> 
        <div className = "form-group">
           <input valid = { this.validator.fieldValid('Budget') }
                    invalid = {!this.validator.fieldValid('Budget ') }
                    type = "text"
                    className = "form-control"
                    placeholder = "Budget"
                    style = {
                        {
                            backgroundColor: " #ffffff0a",
                            fontSize: "18px",
                            color: "white",
                            marginTop: "-10px"
                        }
                    }
                    value = { this.state.budget }
                    onChange = { this.onChange }
                    name = "budget"/>
            <FormFeedback style = {
                { color: "red" }
            }
            invalid = {!this.validator.fieldValid('  Budget ') } > 
            { this.validator.message(' Budget  ', this.state.budget, 'required|numeric') } 
            </FormFeedback>
        </div> 
        <div className = "form-group" >
            <select name = "region"
            value = { this.state.region }
            onChange = { this.onChange }
            style = {
                { width: "601px", backgroundColor: "transparent", fontSize: "18px", color: "white" } } >
            <option style = {
                { fontSize: "18px" } } > Localisation 
            </option> {
                villes.map((el, i) => (
                <option key = { i }
                    value = { el }
                    style = {
                        { color: "black" } } > { el }
             </option>
                ))
            } 
            </select> 
            </div> 
            <div className = "form-group" >
            <select
                       id = "pet-select"
            value = { this.state.agentId }
            onChange = { this.onChange }
            name = "agentId"
            style = {
                {
                    width: "601px", marginTop: "-9px",
                     backgroundColor: "transparent",backgroundColor: "transparent", fontSize: "18px", color: "white" 
                }
            } >
            <option value = "">
            s 'il vous plaît choisissez un agent pour vous aider 
            </option> 
            {agents.data ? agents.data.result.map((el, index) => (
          <option style={{color:"black"}}key={index} value={el._id}> {el.nom} </option>
        )):false}
        </select>
        
            </div>
        <div className = "form-group" >     
        <textarea className = "form-control"
        placeholder = "Description du projet"
        style = {
        {backgroundColor: " #ffffff0a",
         fontSize: "18px",
         color: "white",
         marginTop: "-8px"
         }
            }
        value = { this.state.description2 }
        onChange = { this.onChange }
        name = "description2"/>
        </div> 
        <button type = "submit"
        className = "btn-blue uppercase border_radius"
        defaultValue = "Envoyer"
        style = {{width: "158px",marginTop: "8px",marginLeft: "-627px"}}>
        Soumettre
       </button>
       <Modal visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 style={{color:"#e60505"}}><i className="far fa-hand-peace">félicitations 🎉</i></h1>
                        <h4 style={{textAlign:"center",color:"#000000",marginTop:" 63px"}}>votre demande a été envoyée avec succès</h4>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}><button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "278px"}}>Fermer</button></a>
                    </div>
                </Modal>
     </form> 
        
            </div> 
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
) (FormulaireEtude);