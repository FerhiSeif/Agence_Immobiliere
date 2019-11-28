import React, { Component } from "react";
import axios from "axios";
import "./EtudeProjet.css";
import Modal from 'react-awesome-modal';
import { Input, FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { villes, categories, numbers } from "./../CreerAnnonce/static";
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
            nomAgent: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    openModal() {
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
                email: this.state.email,
                tel: this.state.tel,
                description: this.state.description,
                titre: this.state.titre,
                budget: this.state.budget,
                region: this.state.region,
                description2: this.state.description2,
                statut: this.state.statut,
                //nomAgent: this.statut.nomAgent
            };

            axios
                .post("http://localhost:8080/etudeProjets/add", etudeProjet)
                .then(res => console.log(res.data))
                .catch(err => console.log(err.response.data));
            this.openModal();
        } else {
            e.preventDefault();
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }
    }
    render() {
        return ( 
        <div className = "row" >
            <div className = "col-sm-6 bottom40" >
            <h3 > Informations Perssonnelles </h3>
              <form className = "callus"
                 style = {
                 { paddingTop: "25px" }
                        }
                 onSubmit = { this.onSubmit } >

            <div className = "form-group" >
            <input valid = { this.validator.fieldValid('Nom & prénom') }
            invalid = {!this.validator.fieldValid('Nom & prénom ') }
            type = "text"
            className = "form-control"
            placeholder = "Nom & prénom "
            style = {
                {
                    backgroundColor: "#ffffff0a",
                    fontSize: "18px",
                    color: "white"
                }
            }
            value = { this.state.nom }
            onChange = { this.onChange }
            name = "nom" />
            <FormFeedback style = {
                { color: "red" }
            }
            invalid = {!this.validator.fieldValid('  Nom & prénom ') } > { this.validator.message(' Nom & prénom  ', this.state.nom, 'required|max:22') } 
            </FormFeedback> 
            </div> 
             <div className = "form-group" >
            <input valid = { this.validator.fieldValid('Email') }
            invalid = {!this.validator.fieldValid('Email ') }
            type = "adress"
            className = "form-control"
            placeholder = "Adrresse Email"
            style = {
                {
                    backgroundColor: "#ffffff0a",
                    fontSize: "18px",
                    color: "white"
                }
            }
            value = { this.state.email }
            onChange = { this.onChange }
            name = "email" /
            >
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
            name = "description" / >
            </div>
            </form> 
             </div> 
            <div className = "col-sm-6 bottom40" >
            <h3> Votre Projet </h3>

            <form className = "callus"
            style = {
                { paddingTop: "25px" }
            }
            onSubmit = { this.onSubmit } >

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
        style = {
        {
         width: "158px",
         marginTop: "23px",
        marginLeft: "-627px"
        }
        } > Soumettre </button> 
         </form> 
        <Modal visible = { this.state.visible }
            width = "400"
            height = "300"
            effect = "fadeInLeft"
            onClickAway = {
                () => this.closeModal()
            } >
        <div>
        <h3 style = {
                { color: "black", marginTop: "36px", marginLeft: '4px' }
            } > il faut que vous choisissiez un agent pour qu 'il traite votre demande</h3>
             <h4 style = {
                {
                    color: "black",
                    marginRight: "277px",

                    marginTop: "20px",
                    marginBottom: "-77px",
                    marginLeft: "11px"
                }
            } > Non d 'agent :</h4> 
             <div className = "form-group" >
            <select valid = { this.validator.fieldValid('nom Agent') }
            invalid = {!this.validator.fieldValid('nom Agent ') }
            id = "pet-select"
            value = { this.state.nomAgent }
            onChange = { this.onChange }
            name = "nomAgent"
            style = {
                {
                    height: "34px",
                    color: "black",
                    marginTop: "100px",
                    borderRadius: "5px",
                    width: "376px"
                }
            } >
            <option value = "" >
            s 'il vous plaît choisissez un agent pour vous aider 
            </option> 
            <option value = "dog" > agent1 </option> 
            <option value = "cat" > agent2 </option> 
            <option value = "hamster" > agent3 </option>
             </select>


            </div>


            <a href = "javascript:void(0);"
            onClick = {
                () => this.closeModal()
            } > < button type = "button"
            className = "btn btn-primary"
            style = {
                { marginTop: " 18px", width: "162px", height: "50px", backgroundColor: "#1f3f81" }
            } > Fermer </button>
             </a>
            </div> 
             </Modal>
            </div> 
            </div>
        );
    }
}

export default FormulaireEtude;