import React, { Component } from "react";
import FormulaireEstimation from "./formulaireEstimation";
class Estimation extends Component {
  render() {
    return (
      <div className="Profile">
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
       

        <section id="agent-2-peperty" className="profile padding">
          <div className="container-3">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <h2 className="text-uppercase bottom30">estimation de prix</h2>
                <div className="agent-p-img">
                  <img
                    src="images/estim.jpeg"
                    className="img-responsive"
                    alt="image"
                    style={{height:"233px"}}
                  />
                  
                 
                </div>
              </div>
              <div className="col-md-8">
                <div className="profile-form">
                  <FormulaireEstimation/>
                </div>
              </div>
            </div>
          </div>
         
           
        </section>
        </div>
    );
  }
}

export default Estimation;
