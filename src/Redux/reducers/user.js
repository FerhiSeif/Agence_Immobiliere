import * as actions from "../ActionsDef";

let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: "" };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        user: { ...initialState.user },
        error: action.payload
      };
    case actions.GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: "" };
    case actions.GET_PROFILE_FAILURE:
      return {
        ...state,
        user: { ...initialState.user },
        error: action.payload
      };
    case actions.EDIT_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: "" };
    case actions.EDIT_PROFILE_FAILURE:
      return { ...state, error: action.payload };
    case actions.LOGOUT_SUCCESS:
      return { ...initialState };
    case actions.LOGOUT_FAILURE:
      return { ...state, error: action.payload };
    case actions.ADD_FAVORITE_ANNONCEMENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          favoris: state.user.favoris.concat(action.payload)
        }
      };
    case actions.DELETE_FAVORITE_ANNONCEMENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          favoris: state.user.favoris.filter(el => el !== action.payload)
        }
      };
    default:
      return state;
  }
};

let initialState = {
  user: {
    favoris: []
  },
  error: ""
};

export default userReducer;
