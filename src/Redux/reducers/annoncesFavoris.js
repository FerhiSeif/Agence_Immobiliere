import * as actions from "../ActionsDef";

let annoncesFavorisReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MY_FAVORITES_ANNONCEMENTS_LIST_SUCCESS:
      return {
        ...state,
        favoritesAnnouncements: action.payload,
        error: "",
        collectionLength:
          action.payload.length % 3 === 0
            ? action.payload.length / 3
            : Math.floor(action.payload.length / 3) + 1
      };
    case actions.FETCH_MY_FAVORITES_ANNONCEMENTS_LIST_FAILURE:
      return {
        favoritesAnnouncements: [],
        error: action.payload,
        collectionLength: 1
      };
    case actions.DELETE_FAVORITE_ANNONCEMENT_SUCCESS:
      return {
        favoritesAnnouncements: state.favoritesAnnouncements.filter(
          el => el._id !== action.payload
        ),
        err: "",
        collectionLength:
          state.favoritesAnnouncements.length % 3 === 0
            ? state.favoritesAnnouncements.length / 3
            : Math.floor(state.favoritesAnnouncements.length / 3) + 1
      };
    default:
      return state;
  }
};

export default annoncesFavorisReducer;

const initialState = {
  favoritesAnnouncements: [],
  error: "",
  collectionLength: 1
};
