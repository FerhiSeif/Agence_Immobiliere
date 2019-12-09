import React, { Component } from "react";
import { connect } from "react-redux";
import { getagents } from "../../Redux/ajentsAction";
import AgentItem from "./agentItem";

// /*var myList = [
//   {
//     nom: "Bohdan Kononets",
//     parag:
//       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, seddiam nonummy nibh tempor cum soluta nobis consectetuer.",
//     tel: "(+01) 34 56 7890",
//     email: "bohdan@castle.com",

//     mission: "sales executive"
//   }
// ];
class ListAgent extends Component {
  componentDidMount() {
    this.props.getagents();
  }

  render() {
    const  {agents} = this.props
       //console.log('myagents :', agents ? this.props.agents.data:false)
    return (
      <div>
        {agents.data ? agents.data.result.map((el, index) => (
          <AgentItem key={index} item={el} />
        )):false}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    agents: state.agentsReducer.agents,
    collectionLength: state.agentsReducer.collectionLength
  };
};

export default connect(
  mapStateToProps,
  { getagents }
)(ListAgent);

