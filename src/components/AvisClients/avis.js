import React, { Component } from "react";
import FormulaireAvis from "./formulaireAvis";

class Avis extends Component {
  render() {
    return (
      <div className="Avis">
        {/*bg image */}
        <section style={{background: "url(../images/avis.jpeg) no-repeat",
                        backgroundPosition: "center center" ,
                        backgroundSize: "cover",
                        position: "relative"}}>
            
          <div className="container">
            <div className="row">
            <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <FormulaireAvis />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Avis;
