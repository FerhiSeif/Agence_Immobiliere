import React, { Component } from "react";
class AgentContact extends Component {


  render() {
  const  {agent} = this.props
   // console.log('agent',agents)
   // console.log('myagents :', this.props.agent)
    return (  
      <div className="Agentcontact">
  <h3>{agent.nom}</h3>
        <p className="bottom30">
          {agent.description}
        </p>
        <table className="agent_contact table">
          <tbody>
         
          <tr className="bottom10">
              <td>
                <strong>Mission:</strong>
              </td>
              <td className="text-right">{agent.mission}</td>
            </tr>
            <tr className="bottom10">
              <td>
                <strong>Mobile:</strong>
              </td>
              <td className="text-right">{agent.tel}</td>
            </tr>
            <tr>
              <td>
                <strong>Email Adress:</strong>
              </td>
              <td className="text-right">
              <td className="text-right">{agent.email}</td>
              </td>
            </tr>
            <tr>
              <td>
                <strong>adresse</strong>
              </td>
              <td className="text-right">
    <a href="#.">{agent.adresse}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AgentContact
