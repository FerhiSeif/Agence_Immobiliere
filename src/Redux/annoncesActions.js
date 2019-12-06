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
    console.log('newAnnoncement ;;;;;; ');
    console.log(newAnnoncement);

    console.log('newAnnoncement options ;;;;;; ');
    console.log(newAnnoncement.options);

    var formData = new FormData();
    // const file = newAnnoncement.files[0]
    //  const file1 = newAnnoncement.files[1]
    // formData.append("files", file);
    // formData.append("files", file1);
    newAnnoncement.files.map((file, index) => {
        formData.append(`file${index}`, file);
    });

    formData.append("prix", newAnnoncement.prix);
    formData.append("titre", newAnnoncement.titre);
    formData.append("region", newAnnoncement.region);
    formData.append("surface", newAnnoncement.surface);
    formData.append("adresse", newAnnoncement.adresse);
    formData.append("categorie", newAnnoncement.categorie);
    formData.append("nombreEtage", newAnnoncement.nombreEtage);
    formData.append("nombrePiece", newAnnoncement.nombrePiece);
    formData.append("nombreFacade", newAnnoncement.nombreFacade);
    formData.append("nombreSalleDeBain", newAnnoncement.nombreSalleDeBain);
    formData.append("etat", newAnnoncement.etat);
    formData.append("options", JSON.stringify(newAnnoncement.options));
    formData.append("description", newAnnoncement.description);
    formData.append("statut", newAnnoncement.statut);
    formData.append("situation", newAnnoncement.situation);
    formData.append("video", newAnnoncement.video);
    formData.append("nombreSalon", newAnnoncement.nombreSalon);
    formData.append("ValableAPartirDe", newAnnoncement.ValableAPartirDe);
    formData.append("ALaUne", newAnnoncement.ALaUne);
    formData.append("nombreGarage", newAnnoncement.nombreGarage);
    formData.append("lat", newAnnoncement.lat);
    formData.append("lng", newAnnoncement.lng);
    formData.append("myoptions", newAnnoncement.myoptions)
    formData.append("nomAgent",newAnnoncement.nomAgent)
    try {
        let response = await axios({
            method: "POST",
            url: `/bienImmobiliers/add`,
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
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
            payload: "Fetching selected annoncement to edit failed, please to try again "
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