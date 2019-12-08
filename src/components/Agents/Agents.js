import React, { Component } from "react";
import ListAgent from "./listAgent";

class Agents extends Component {

  render() {
    return (
      <div className="Agents">
        {/* Page Banner Start*/}
        <section className="page-banner padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="text-uppercase">Agent Style 1</h1>
                <p>
                  Serving you since 1999. Lorem ipsum dolor sit amet consectetur
                  adipiscing elit.
                </p>
                <ol className="breadcrumb text-center ">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                  </li>
                  <li>
                    <a href="#">Agent</a>
                  </li>
                  <li className="active">Agent Style - 2</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        {/* Page Banner End */}
        {/* Agent Start */}
        <section id="agent-2" className="padding_top padding_bottom_half">
          <div className="container">
            <div className="row">
              <ListAgent />
            </div>
          </div>
        </section>
        {/* Agent End */}
      </div>
    );
  }
}


export default Agents;
