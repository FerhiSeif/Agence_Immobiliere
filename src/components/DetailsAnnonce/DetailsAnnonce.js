import React, { Component } from "react";
import { connect } from "react-redux";
import { Link,withRouter } from "react-router-dom";
import "./detailsAnnonce.css";
import "react-image-gallery/styles/css/image-gallery.css";

import { getSelectedAnnoncementAction } from "../../Redux/annoncesActions";
import { compose } from "redux";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
import ImageGallery from 'react-image-gallery';
import YouTube from 'react-youtube';



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
      date:"",
      modalEtat1:false,
      video:"",
      region:""
        };
    this.onChange = this.onChange.bind(this);
    this.accessControl = this.accessControl.bind(this);
    this.openModal = this.openModal.bind(this);
    this.open = this.open.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }


  componentDidMount() {
 
    this.props.getSelectedAnnoncementAction(this.props.id);

  }

  displayAnnoncementOptions = () => {
    let { options } = this.props.selectedAnnoncement;
    let optionsKeys = Object.keys(options);
    let validOptions = optionsKeys.filter(el => options[el] === true);
    return validOptions;
  };
  
  accessControl (){
    let autorization = localStorage.getItem("Authorization");
    if ((!autorization)||(autorization == null)) this.props.history.push("/login");
    else{
      
    
    }
  };

  openModal() {
    this.setState({
        visible : true
    });
}
onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}
closeModal() {
        this.setState({
             statut: "",
      visible:false,
      nom: "",
      tel: "",
      email: "",
      prixPropose:"",
      date:"",
      modalEtat1:false,
     
        });
}
  open(data) {
    if(data == 'date')
      this.setState({modalEtat1 :true})
    else
          this.setState({modalEtat1 :false})

    this.accessControl();
     this.openModal()
  }
  
onSubmit(e) {
  const {modalEtat1} = this.state
   e.preventDefault();
   
  if (this.validator.allValid()) {
  const negocier = {
    nom: this.state.nom,
    tel: this.state.tel,
    nomAgent: this.state.nomAgent,
    email: this.state.email,
    prixPropose: this.state.prixPropose
  };

    const Visite = {
    nom: this.state.nom,
    tel: this.state.tel,
    nomAgent: this.state.nomAgent,
    email: this.state.email,
    date: this.state.date
  };

  var getWay = "";
  var dataPassrelle 

  if(modalEtat1 == true)
  {
    getWay = "http://localhost:8080/negocierPrix/add"
    dataPassrelle = negocier
  }
  else
  {
    getWay = "http://localhost:8080/demandeVisites/add"
    dataPassrelle = Visite
  }


  axios
  .post(getWay, dataPassrelle)
  .then(res => console.log(res.data))
  .catch(err => console.log(err.response.data));

}
   else {
    e.preventDefault();
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  
}
}
  _handleSubmit(){
   this.accessControl()

   let { selectedAnnoncement } = this.props;
   
    
   console.log(selectedAnnoncement.region,selectedAnnoncement.categorie)
  if(selectedAnnoncement.statut=="A louer")
        {  
          axios({
            method: "POST",
            url: `/demandeLocations/add`,
            headers: { Authorization: localStorage.getItem("Authorization") },
            data:{
      userId : selectedAnnoncement.userId,
      idImmobilier: selectedAnnoncement._id,
      region:selectedAnnoncement.region,
      surface:selectedAnnoncement.surface,
      prix:selectedAnnoncement.prix,
      categorie:selectedAnnoncement.categorie,
      
    }
    
        });
        
        alert("demande envoyee");
        let statut = 200;
        return statut;}
  
    else 
         if( selectedAnnoncement.statut  != "A louer"){
             axios({
            method: "POST",
            url: `/demandeAchats/add`,
            headers: { Authorization: localStorage.getItem("Authorization") },
       
 headers: { Authorization: localStorage.getItem("Authorization") },
            data:{
      userId : selectedAnnoncement.userId,
      idImmobilier: selectedAnnoncement._id,
      region:selectedAnnoncement.region,
      surface:selectedAnnoncement.surface,
      prix:selectedAnnoncement.prix,
      categorie:selectedAnnoncement.categorie,
      
    }
    
        });
        
        alert("demande envoyee");
        let statut = 200;
        return statut;}
  
    
             }
      

 



  render() {
    let { selectedAnnoncement } = this.props;
    const {visible,modalEtat1} = this.state
    var videourl

    if(selectedAnnoncement.video != undefined)
    {
        var tab1= selectedAnnoncement.video.split("v=");
        var tab2= tab1[1].split("=");
        var tab3= tab2[0].split("&");

        videourl=tab3[0];
        console.log("tab3::::::");
        console.log(tab3);
    }

    var oldimages = []
    if( selectedAnnoncement.files != undefined )
    {
      selectedAnnoncement.files.forEach(element => {
        if(element != null)
        {
            oldimages.push({
                original: `http://localhost:8080/uploads/${element.filename}`,
                thumbnail: `http://localhost:8080/uploads/${element.filename}`,
                });
        }
      });
    }
const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div className="details-annonce-container">
        {/* Page Banner Start*/}
        <section className="page-banner padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="text-uppercase"> Immobilier App </h1>
                <h3
                  className="text-uppercase"
                  style={{ color: "white", marginBottom: "27px" }}
                >
                  Vente, Achat Etude et Conseil dans le domaine Immobilier
                </h3>
                <p className="text-uppercase">Serving you since 1999</p>
              </div>
            </div>
          </div>
        </section>
        {/* Page Banner End */}
        {/* Property Detail */}
        <section id="property" className="padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 listing1 property-details">
                {selectedAnnoncement.situation === false && (
                  <p className="annonce-situation">
                    Cette annonce est en cours de validation par les
                    administrateurs
                  </p>
                )}
                <h2 className="text-uppercase">{selectedAnnoncement.titre}</h2>
                <p className="bottom30">
                  {selectedAnnoncement.adresse}, {selectedAnnoncement.region}
                </p>
                    
                    <ImageGallery items={oldimages} useBrowserFullscreen={false} 
                                  showFullscreenButton={false}  />

                <div id="property-d-1" className="owl-carousel single">
                 
                  
                </div>
                <div id="property-d-1-2" className="owl-carousel single">
                  <div >

                  </div>

                </div>
                <div className="property_meta bg-black bottom40">
                  <span>
                    <i className="icon-select-an-objecto-tool" />
                    Surface : {selectedAnnoncement.surface}
                  </span>
                  <span>
                    <i className=" icon-microphone" /> Chambres :{" "}
                    {selectedAnnoncement.nombrePiece}
                  </span>
                  <span>
                    <i className="icon-safety-shower" />
                    Salle de bain : {selectedAnnoncement.nombreSalleDeBain}
                  </span>
                  <span>
                    <i className="icon-old-television" />
                    Salon : {selectedAnnoncement.nombreSalon}
                  </span>
                  <span>
                    <i className="icon-garage" /> Garage :{" "}
                    {selectedAnnoncement.nombreGarage}
                  </span>
                </div>
                <h2 className="text-uppercase"> Déscription de la propriété</h2>
                <p className="bottom30">{selectedAnnoncement.description}</p>

                <h2 className="text-uppercase bottom20">SOMMAIRE RAPIDE</h2>
                <div className="row property-d-table bottom40">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-striped table-responsive">
                      <tbody>
                        <tr>
                          <td>
                            <b>ID propriété </b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement._id}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>prix</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.statut === "A louer"
                              ? selectedAnnoncement.prix + "/Mois"
                              : selectedAnnoncement.prix}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Surface</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.surface} M²
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Chambre</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombrePiece}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-striped table-responsive">
                      <tbody>
                        <tr>
                          <td>
                            <b>Salles de bain</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombreSalleDeBain}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Garages </b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombreGarage}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Etage</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombreEtage}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>valable a partir de</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.ValableAPartirDe.slice(0, 10)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">Options</h2>
                <div className="row bottom40">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <ul className="pro-list options-list">
                      {this.displayAnnoncementOptions().map((el, i) => {
                        return (
                          <li key={i} style={{ textTransform: "capitalize" }}>
                            {el}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">
                  Vidéo de Présentation
                </h2>
                <div className="row bottom40">
                  <div className="col-md-12 padding-b-20">
                    <div className="pro-video">
                      <figure className="wpf-demo-gallery">
                     
                        <video className="video" controls>
                       
                      {selectedAnnoncement.video}
                        </video>
                      </figure>
                    </div>
        
                  </div>
                              <YouTube
          videoId= {videourl}
          opts={opts}
            onReady={this._onReady}
           />
                </div>
                <h2 className="text-uppercase bottom20">localisation</h2>
                <div className="row bottom40">
                  <div className="col-md-12 bottom20">
                    <div className="property-list-map">
                      <div
                        id="property-listing-map"
                        className="multiple-location-map"
                        style={{ width: "100%", height: "430px" }}
                      />
                    </div>
                  </div>
                  <div className="social-networks">
                    <div className="social-icons-2">

                      {
                        selectedAnnoncement.statut != "A louer"
                        ?
                        <span  onClick={()=>{this._handleSubmit()}}
                       >
                        <Link to ="#" >
                        <i className="fa fa-key" aria-hidden="true"></i>{" "}
                          Acheter
                          </Link>
                        </span>
                        :
                        <span onClick={this.accessControl} onClick={()=>{this._handleSubmit()}}>
                          <Link to ="#">
                          <i className="fa fa-key" aria-hidden="true"></i>{" "}
                            Louer
                            </Link>
                        </span>

                      }


                      <span  onClick={()=>{this.open('date')}}>
                        <a href="#"  >
                        <i className="fa fa-home" aria-hidden="true"></i>{" "}
                          Demander Une Visite
                        </a>
                      </span>
                      <span  onClick={()=>{this.open('prix')}}>
                        <a href="#">
                        <i className="fa fa-home" aria-hidden="true"></i>{" "}
                          Négocier Prix
                    </a>
                                           </span>
                      <span>
                        <Modal visible={visible} width="600" height="489" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                       
                       
                        <form className="callus">
                        <div style={{marginTop: "20px"}}>
            <h4  style={{marginLeft: "17px"}}>Nom & prénom :</h4>         
            <input 
            valid={this.validator.fieldValid('Nom & prénom')} 
            invalid={!this.validator.fieldValid('Nom & prénom ')}   
            type="text" className="form-control" placeholder="Nom & prénom " value={this.state.nom}
            onChange={this.onChange}
            name="nom" style={{marginLeft: "17px",
            marginTop: "20px",
              
              width: '566px'}}/>
              <FormFeedback  style={{color:"red",marginLeft: "17px"}}  invalid={!this.validator.fieldValid('  Nom & prénom ')}>
            {this.validator.message(' Nom & prénom  ', this.state.nom, 'required|min:6|max:22')}</FormFeedback>
         
          <h4   style={{marginLeft: "17px"}}>Adresse Email :</h4>
          
          
          <input
          valid={this.validator.fieldValid('Email')} 
          invalid={!this.validator.fieldValid('Email ')}     
          type="text"
          className="form-control"
          placeholder="Adresse Email"
         
          value={this.state.email}
          onChange={this.onChange}
          name="email"
          style={{marginLeft: "17px",
              
          width: '566px'}}
      
        />  
        <FormFeedback  style={{color:"red", marginLeft: "17px"}}  invalid={!this.validator.fieldValid('  email ')}>{this.validator.message('email', this.state.email, 'required|email')}</FormFeedback>
   
        <h4   style={{marginLeft: "17px"}}>Téléphone :</h4>          
          <input
          valid={this.validator.fieldValid('Téléphone')} 
          invalid={!this.validator.fieldValid('Téléphone ')}     
          type="text"
          className="form-control"
          placeholder="Téléphone  "
         
          value={this.state.tel}
          onChange={this.onChange}
          name="tel"
          style={{marginLeft: "17px",
              
          width: '566px'}}
      
        /> 
        <FormFeedback  style={{color:"red", marginLeft: "17px"}}  invalid={!this.validator.fieldValid('  tel ')}>{this.validator.message('tel', this.state.tel, 'required|phone')}</FormFeedback>
        {
          modalEtat1 == false
          ?
                  <div>
            <h4   style={{marginLeft: "17px"}}>Prix Proposé :</h4>          
            <input
                valid={this.validator.fieldValid('Prix Proposé')} 
                invalid={!this.validator.fieldValid('Prix Proposé ')}      
                type="text"
                className="form-control"
                placeholder="Téléphone  "
                value={this.state.prixPropose}
                onChange={this.onChange}
                name="prixPropose"
                style={{marginLeft: "17px",      
                width: '566px'}}
          />    
        </div>
          :
                  <div>
            <h4   style={{marginLeft: "17px"}}>Date :</h4>   
             <input
              valid={this.validator.fieldValid('Date')} 
                invalid={!this.validator.fieldValid('Date')} 
                        type="date"
                        className="form-control"
                        placeholder="dd/mm/yyyy"
                        onChange={this.onChange}
                        value={this.state.date}
                        name="date"
                        style={{marginLeft: "17px",      
                width: '566px'}}
                      />       
             
        </div>
        }
           
      <FormFeedback  style={{color:"red", marginLeft: "17px"}}  invalid={!this.validator.fieldValid('  prixPropose ')}>{this.validator.message('prixPropose', this.state.prixPropose, 'required|numeric')}</FormFeedback>

                            <button type="submit" className="btn btn-primary" 
                            style={{    width: "200px",
                              marginTop: "25px",
                              height: "44px"}}
                              onClick={(e)=> 
                              {
                                this.onSubmit(e)
                                this.setState({visible : false});  
                              }}>
                             Envoyer</button>
                        </div>
                        </form>
                    </Modal>
                 </span>
                    </div>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">Contact Agent</h2>
                <div className="row">
                  <div className="col-sm-4 bottom40">
                    <div className="agent_wrap">
                      <div className="image">
                        <img src="images/agent-round1.png" alt="Agents" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 bottom40">
                    <div className="agent_wrap">
                      <h3>Bohdan Kononets</h3>
                      <p className="bottom30">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh tempor cum soluta nobis
                        consectetuer adipiscing eleifend option congue nihil
                        imperdiet doming…
                      </p>
                      <table className="agent_contact table">
                        <tbody>
                          <tr className="bottom10">
                            <td>
                              <strong>Téléphone:</strong>
                            </td>
                            <td className="text-right">(+01) 34 56 7890</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Email Adress:</strong>
                            </td>
                            <td className="text-right">
                              <a href="#.">bohdan@castle.com</a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Skype:</strong>
                            </td>
                            <td className="text-right">
                              <a href="#.">bohdan.kononets</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div
                        style={{ borderBottom: "1px solid #d3d8dd" }}
                        className="bottom15"
                      />
                      <ul className="social_share">
                        <li>
                          <a href="#." className="facebook">
                            <i className="icon-facebook-1" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="twitter">
                            <i className="icon-twitter-1" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="google">
                            <i className="icon-google4" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="linkden">
                            <i className="fa fa-linkedin" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="vimo">
                            <i className="icon-vimeo3" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-4 bottom40">
                    <form className="callus">
                      <div className="form-group">
                        <label> Nom </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom"
                        />
                      </div>
                      <div className="form-group">
                        <label> Teléphone </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Téléphone"
                        />
                      </div>
                      <div className="form-group">
                        <label> Email </label>

                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <label> Message </label>

                        <textarea
                          className="form-control"
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn-blue uppercase border_radius"
                        defaultValue="Envoyer Message"
                      />
                    </form>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        {/*  Property Detail End */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAnnoncement: state.singleAnnouncementReducer.selectedAnnoncement
  };
};

export default

compose(
  connect(
    mapStateToProps,
    { getSelectedAnnoncementAction }
  ),
  withRouter
)(DetailsAnnonce);
