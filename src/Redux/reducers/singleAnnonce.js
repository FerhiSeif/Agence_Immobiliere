import * as actions from "../ActionsDef";

let singleAnnouncementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_SELECTED_ANNONCEMENT_SUCCESS:
      return { selectedAnnoncement: action.payload, err: "" };
    case actions.FETCH_SELECTED_ANNONCEMENT_FAILED:
      return { ...initialState, err: action.payload };
    default:
      return state;
  }
};

export default singleAnnouncementReducer;

let initialState = {
  selectedAnnoncement: {
    titre: "",
    region: "",
    surface: "",
    prix: "",
    nombreEtage: "",
    nombrePiece: "",
    nombreFacade: "",
    nombreSalleDeBain: "",
    statut: "",
    description: "",
    ALaUne: "",
    ValableAPartirDe: "",
    etat: "",
    categorie: "",
    options: {
      piscine: false,
      jardin: false,
      interphone: false,
      internet: false,
      vueSurMer: false,
      camera: false,
      chauffage: false,
      balcon: false,
      climatisation: false
    },
    images: [],
    imageUrls: [],
    message: "",
    nombreGarage: "",
    nombreSalon: ""
  },
  err: ""
};
