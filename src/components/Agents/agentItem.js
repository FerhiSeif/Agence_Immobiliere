import React, { Component } from "react";
import { Link } from 'react-router-dom'


class AgentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const { item } = this.props;
    console.log('myitem',item)
 //  console.log("itemmmmmmmmmmm",item.files[0].filename)
        return ( <div className = "col-sm-4 bottom40" >
            <div className="agent_wrap">
              <div className="image">
                <img src={`http://localhost:8080/uploads/${item.files ? item.files[0].filename:false}`}/>
                <div className="img-info">
                  <h3>{item.nom}</h3>
                  <span>{item.mission}</span>
                  <p className="top20 bottom30">{item.description}</p>
                  <table className="agent_contact table">
                    <tbody>
                      <tr className="bottom10">
                        <td>
                          <strong>Téléphone:</strong>
                        </td>
                        <td className="text-right">{item.tel}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Email Adress:</strong>
                        </td>
                        <td className="text-right">
                          <a href="#.">{item.email}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <Link to={{pathname: '/profilAgent',
                           agent:item  
                            }} className="btn-more">
                    <i> 
                      <img alt="arrow" src="images/arrow-yellow.png"/>
                    </i>
                    <span>voir Profil</span>
                    <i> 
                      <img alt="arrow" src="images/arrow-yellow.png"/>
                    </i>                  
                    </Link>
                </div>
              </div>
            </div>
    
            </div>
        );
    }
}

export default AgentItem;
