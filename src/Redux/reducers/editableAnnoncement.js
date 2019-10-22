import * as actions from "../ActionsDef";

let editableAnnoncementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_SELECTED_ANNONCEMENT_TO_EDIT_SUCCESS:
      return { selectedAnnoncement: action.payload, err: "" };
    case actions.FETCH_SELECTED_ANNONCEMENT_TO_EDIT_FAILED:
      return { ...initialState, err: action.payload };
    default:
      return state;
  }
};

export default editableAnnoncementReducer;

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
