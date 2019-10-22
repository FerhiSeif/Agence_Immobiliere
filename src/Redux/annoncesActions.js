import axios from "axios";

import * as actions from "./ActionsDef";

export const getAnnouncementsList = queries => async dispatch => {
  let queriesObject = Object.keys(queries);
  let query = "?";
  queriesObject.map(el => {
    if (queries[el] !== "") query += `${el}=${queries[el]}&`;
  });
  query = query.slice(0, query.length - 1);
  console.log(query);
  try {
    let response = await axios({
      method: "GET",
      url: `/bienImmobiliers/all${query}`
    });
    dispatch({
      type: actions.FETCH_ANNONCEMENT_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: actions.FETCH_ANNONCEMENT_FAILURE,
      payload: "Fetching announements list failed, please to try again "
    });
  }
};

export const addAnnoncementAction = newAnnoncement => async dispatch => {
  try {
    let response = await axios({
      method: "POST",
      url: `/bienImmobiliers/add`,
      data: newAnnoncement,
      headers: { Authorization: localStorage.getItem("Authorization") }
    });
    alert("your annoncement was added successfuly");
    let statut = 200;
    return statut;
  } catch (err) {
    alert("Oh Oh, failed to add your new annoncement, please to try again");
  }
};

export const getSelectedAnnoncementAction = id => async dispatch => {
  try {
    let response = await axios({
      method: "GET",
      url: `/bienImmobiliers/selectedAnnonce/${id}`
    });
    dispatch({
      type: actions.FETCH_SELECTED_ANNONCEMENT_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: actions.FETCH_SELECTED_ANNONCEMENT_FAILED,
      payload: "Fetching selected annoncement failed, please to try again "
    });
  }
};

export const getMyAnnoncementsAction = () => async dispatch => {
  try {
    let response = await axios({
      method: "GET",
      url: "/bienImmobiliers/mes-annonces",
      headers: { Authorization: localStorage.getItem("Authorization") }
    });

    dispatch({
      type: actions.FETCH_MY_ANNONCEMENTS_LIST_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: actions.FETCH_MY_ANNONCEMENTS_LIST_FAILURE,
      payload: "Fetching my annoncements failed, please to try again "
    });
  }
};

export const deleteAnnoncementAction = (
  annoncementId,
  annoncementTitle
) => async dispatch => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `/bienImmobiliers/remove/${annoncementId}`,
      headers: { Authorization: localStorage.getItem("Authorization") }
    });

    dispatch({
      type: actions.DELETE_ANNONCEMENT_SUCCESS,
      payload: annoncementId
    });
    alert(`The ${annoncementTitle} annoncement was deleted successfuly`);
  } catch (err) {
    alert(
      `The ${annoncementTitle}  annoncement deleting request failed, please to try again `
    );
  }
};

export const getSelectedAnnoncementToEditAction = id => async dispatch => {
  try {
    let response = await axios({
      method: "GET",
      url: `/bienImmobiliers/selectedAnnonce/${id}`,
      headers: { Authorization: localStorage.getItem("Authorization") }
    });
    dispatch({
      type: actions.FETCH_SELECTED_ANNONCEMENT_TO_EDIT_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: actions.FETCH_SELECTED_ANNONCEMENT_TO_EDIT_FAILED,
      payload:
        "Fetching selected annoncement to edit failed, please to try again "
    });
  }
};

export const editSelectedAnnoncementAction = data => async dispatch => {
  try {
    let response = await axios({
      method: "PUT",
      url: `/bienImmobiliers/update-selected-annoncement/${data._id}`,
      headers: { Authorization: localStorage.getItem("Authorization") },
      data
    });
    alert(`Annoncement ${data.titre} was successfully modified `);
    return 200;
  } catch (err) {
    alert(` Failed to modify annoncement ${data.titre}, please to try again`);
    return 404;
  }
};
