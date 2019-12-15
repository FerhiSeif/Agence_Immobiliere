import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import { Input,FormFeedback } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import "./avis.css"
import BeautyStars from 'beauty-stars';
class FormulaireAvis extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      messages: {
        required             : '⚠ Le champ :attribute est requis.',
      },
      autoForceUpdate: this
    });
    this.state = {
      avis:"",
      value : 0
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
    const avisClient = {
      avis: this.state.avis,
      value: this.state.value
    };
console.log("okkk")
    axios
      .post("http://localhost:8080/avis/addavis", avisClient)
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
      
          <div className="single-query form-group top10" style={{paddingTop: "508px",
            marginLeft: "215px"}}>
            
            <textarea
             valid={this.validator.fieldValid('Votre Avis')} 
             invalid={!this.validator.fieldValid('Votre Avis ')}
              type="text"
              className="keyword-input"
              placeholder="Donnez votre avis"
              style={{ width: "579px",height:"188px",fontSize: "30px",
              color: "black" , backgroundColor:"#bf9b7c", borderWidth:"5px",borderColor:"black" }}
              value={this.state.avis}
              onChange={this.onChange}
              name="avis"
            />
            <FormFeedback  style={{color:"white",fontSize:"24px",fontWeight: 700}}  invalid={!this.validator.fieldValid(' Avis')}>
            {this.validator.message('Avis ', this.state.avis, 'required')}
            </FormFeedback>
          </div>
          <div className="single-query form-group top10" style={{marginLeft: "240px",marginTop:"-31px"}}>
          <h1 style={{color:"white",paddingRight:"85px",marginBottom:"14px"}}>Notez nos services</h1>
          <BeautyStars
            value={this.state.value}
           inactiveColor = "#ffffff"
            onChange={value => this.setState({ value })}
          />
          </div>
          {/* <button type="Envoyer" className="btn-blue border_radius top15">
            Envoyer
          </button> */}
            <button 
            type="submit"
            className="btn-blue uppercase btn-blue border_radius top15"
            style={{    marginLeft: "428px",
              marginBottom: "50px"}}
            value="Envoyer"
            onClick={this.onSubmit}  
            >Soumettre </button>   
              <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 style={{marginTop: "55px",color:"#e60505",marginRight: "-11px"}}><i className="far fa-hand-peace">Mercie pour votre avis 👏🏼</i></h1>
                        
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}><button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "149px"}}>Fermer</button></a>
                    </div>
                </Modal>
        
        </form>
      </div>
    );
  }
}

export default FormulaireAvis;
