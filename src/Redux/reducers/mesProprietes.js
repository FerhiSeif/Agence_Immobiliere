import * as actions from "../ActionsDef";

let mesProprietesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MY_ANNONCEMENTS_LIST_SUCCESS:
      return {
        mesProprietes: action.payload,
        error: "",
        collectionLength:
          action.payload.length % 3 === 0
            ? action.payload.length / 3
            : Math.floor(action.payload.length / 3) + 1
      };
    case actions.FETCH_MY_ANNONCEMENTS_LIST_FAILURE:
      return { mesProprietes: [], error: action.payload, collectionLength: 1 };
    case actions.DELETE_ANNONCEMENT_SUCCESS:
      return {
        ...state,
        mesProprietes: state.mesProprietes.filter(
          el => el._id !== action.payload
        ),
        collectionLength:
          state.mesProprietes.length % 3 === 0
            ? state.mesProprietes.length / 3
            : Math.floor(state.mesProprietes.length / 3) + 1
      };
    default:
      return state;
  }
};

export default mesProprietesReducer;

const initialState = {
  mesProprietes: [],
  error: "",
  collectionLength: 1
};
