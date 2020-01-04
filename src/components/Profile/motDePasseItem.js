import React, { Component } from "react";

class MotDePassItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row">
        <form className="callus">
          <div className="col-sm-4">
            <div className="single-query"style={{width:"170px" ,marginLeft:"-82px"}}>
              <label>Mot DE Passe Actuel:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input type="password" className="keyword-input" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query" style={{width:"170px", marginLeft:"-73px"}}>
              <label>Nouveau Mot DE Passe:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input type="password" className="keyword-input" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query"style={{width:"170px" ,marginLeft:"-70px"}}>
              <label>Confirmer Mot DE Passe:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input type="password" className="keyword-input" />
            </div>
          </div>
          <div className="col-sm-12 text-right" style={{marginLeft:"-65px"}}>
            <a className="btn-blue border_radius" href="#.">
              Sauvegarder
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default MotDePassItem;
