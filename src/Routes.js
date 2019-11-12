import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home/Home";
import AchatComponent from "./components/AchatComponent/AchatComponent";
import LocationComponent from "./components/LocationComponent/LocationComponent";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import CreeAnnonce from "./components/CreerAnnonce/CreerAnnonce";
import Favoris from "./components/Favoris/Favoris";
import MesProprietes from "./components/MesProprietes/MesProprietes";
import DetailsAchat from "./components/DetailsAchat/DetailsAchat";
import DetailsAnnonce from "./components/DetailsAnnonce/DetailsAnnonce";
import EtudeProjet from "./components/EtudeProjet/EtudeProjet";
import Conseils from "./components/Conseils/Conseils";
import Autre from "./components/Autre/Autre";
import Reclamation from "./components/Reclamation/Reclamation";
import Agents from "./components/Agents/Agents";
import ProfilAgent from "./components/ProfilAgent/ProfilAgent";
import ReactBot from "./components/reactBot/reactBot";
import EditAnnoncement from "./components/EditAnnoncement";
import DashboardComponent from "./components/chatFirbase/dashboard/dashboard"
import Estimation from "./components/EstimationDePrix/estimation"

class Routes extends React.Component {
  render() {
    return (
      <div className="routes-main">
        <Route exact path="/" component={Home} />
        <Route path="/achat" component={AchatComponent} />
        <Route path="/location" component={LocationComponent} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/déposer-une-annonce" component={CreeAnnonce} />
        <Route path="/favoris" component={Favoris} />
        <Route path="/mesProprietes" component={MesProprietes} />
        <Route path="/detailsAchat" component={DetailsAchat} />
        <Route
          path="/detail-annonce/:id"
          render={props => <DetailsAnnonce id={props.match.params.id} />}
        />
        <Route
          path="/modifier-annonce/:id"
          render={props => <EditAnnoncement id={props.match.params.id} />}
        />

        <Route path="/etudeProjet" component={EtudeProjet} />
        <Route path="/conseils" component={Conseils} />
        <Route path="/autre" component={Autre} />
        <Route path="/reclamation" component={Reclamation} />
        <Route path="/agents" component={Agents} />
        <Route path="/profilAgent" component={ProfilAgent} />
        <Route path="/reactBot" component={ReactBot} />
        <Route path='/messages' component={DashboardComponent} />
        <Route path='/estimations' component={Estimation} /> 
 
        
      </div>
    );
  }
}

export default Routes;
