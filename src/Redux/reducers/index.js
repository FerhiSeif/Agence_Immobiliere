import { combineReducers, createStore } from "redux";

import filtersReducer from "./filters";
import announcementsReducer from "./annonces";
import userReducer from "./user";
import singleAnnouncementReducer from "./singleAnnonce";
import mesProprietesReducer from "./mesProprietes";
import editableAnnoncementReducer from "./editableAnnoncement";
import annoncesFavorisReducer from "./annoncesFavoris";

let reducers = combineReducers({
  filtersReducer,
  announcementsReducer,
  userReducer,
  singleAnnouncementReducer,
  mesProprietesReducer,
  editableAnnoncementReducer,
  annoncesFavorisReducer
});

export default reducers;
