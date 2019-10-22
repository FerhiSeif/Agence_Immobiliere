export const addFilter = filter => dispatch => {
  dispatch({
    type: "ADD_FILTER",
    payload: filter
  });
};
