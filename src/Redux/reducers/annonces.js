import * as actions from "../ActionsDef";

let announcementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ANNONCEMENT_SUCCESS:
      return {
        ...state,
        announcements: action.payload,
        error: "",
        collectionLength:
          action.payload.length % 3 === 0
            ? action.payload.length / 3
            : Math.floor(action.payload.length / 3) + 1
      };
    case actions.FETCH_ANNONCEMENT_FAILURE:
      return {
        announcements: [],
        error: action.payload,
        collectionLength: 1
      };
    default:
      return state;
  }
};

export default announcementsReducer;

const initialState = {
  announcements: [],
  error: "",
  collectionLength: 1
};
