import React, { Component } from "react";
import {Link} from 'react-router-dom'
class PropreiteAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { item } = this.props;
        console.log(
          'iteem',item
        )
        return (
            <div className="col-sm-6">
              <div className="listing_full">
                <div className="image">
                  <img alt="image" src="images/b-d-property.jpg" />
                  <span className="tag_l">Featured</span>
                  <span className="tag_t">{item.statut}</span>
                </div>
                <div className="listing_full_bg">
                  <div className="listing_inner_full">
                    <span>
                      <Link to={`detail-annonce/${item._id}`}>
                        <i className="icon-like" />
                      </Link>
                    </span>
                    <Link to={`detail-annonce/${item._id}`}>
                      <h3>{item.titre}</h3>
                      <p>{item.region}</p>
                    </Link>
                    <div className="favroute clearfix">
                      <div className="property_meta">
                        <span>
                          <i className="icon-select-an-objecto-tool" />
                          {item.surface}
                        </span>
                        <span>
                          <i className=" icon-microphone" />
                          {item.nombrePiece}
                        </span>
                        <span>
                          <i className="icon-safety-shower" />
                          {item.nombreSalleDeBain}
                        </span>
                        <span className="border-l">{item.prix}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
        }
    }

    export default PropreiteAgent;