import React, { Component } from "react";
import PropreiteAgent from "./proprieteAgent";
import { connect } from "react-redux";
import { getAnnouncementsList } from "../../Redux/annoncesActions";

{/* var myList = [{
        statut: "For Sale",
        titre: "Park Avenue Apartment",
        Localisation: "Towson London, MR 21501",
        surface: " 4800 sq ft",
        chambre: "3 Bedrooms",
        salleDeBain: "2 Bedrooms",
        prix: "$38,600 / pm"
    },
    {
        statut: "For Sale",
        titre: "Park Avenue Apartment",
        Localisation: "Towson London, MR 21501",
        surface: " 4800 sq ft",
        chambre: "3 Bedrooms",
        salleDeBain: "2 Bedrooms",
        prix: "$38,600 / pm"
    },
    {
        statut: "For Sale",
        titre: "Park Avenue Apartment",
        Localisation: "Towson London, MR 21501",
        surface: " 4800 sq ft",
        chambre: "3 Bedrooms",
        salleDeBain: "2 Bedrooms",
        prix: "$38,600 / pm"
    },
    {
        statut: "For Sale",
        titre: "Park Avenue Apartment",
        Localisation: "Towson London, MR 21501",
        surface: " 4800 sq ft",
        chambre: "3 Bedrooms",
        salleDeBain: "2 Bedrooms",
        prix: "$38,600 / pm"
    }
];*/}
class ListProprieteAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

      componentDidMount() {
    this.props.getAnnouncementsList({ aLaUne: true });
  }
    
    render() {
      const {agent, announcementsList } = this.props
      console.log('agent',announcementsList)
        return ( <div > {
                announcementsList.filter((elm=>elm.agentId==agent._id && elm.situation===true)).map((el, index) => ( <
                    PropreiteAgent key = { index }
                    item = { el }
                    />
                ))
            } </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        announcementsList: state.announcementsReducer.announcements
    };
};

export default connect(
    mapStateToProps, { getAnnouncementsList }
)(ListProprieteAgent)