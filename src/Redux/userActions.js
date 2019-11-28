import axios from "axios";

import * as actions from "./ActionsDef";

export const loginAction = user => async dispatch => {
    try {
        let response = await axios({
            method: "POST",
            url: "/clients/login",
            data: user
        });

        localStorage.setItem("Authorization", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));


        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: response.data.user
        });
    } catch (err) {
        dispatch({
            type: actions.LOG_IN_FAILURE,
            payload: "Log In failed, please to try again"
        });
    }
};

export const getProfileAction = () => async dispatch => {
    try {
        let response = await axios({
            method: "GET",
            url: "/clients/profile",
            headers: { Authorization: localStorage.getItem("Authorization") }
        });
        dispatch({
            type: actions.GET_PROFILE_SUCCESS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: actions.GET_PROFILE_FAILURE,
            payload: "fetching user profile failed"
        });
    }
};

export const editProfileAction = updatedUser => async dispatch => {
    try {
        let response = await axios({
            method: "POST",
            url: "/clients/update-profile",
            headers: { Authorization: localStorage.getItem("Authorization") },
            data: updatedUser
        });

        dispatch({
            type: actions.EDIT_PROFILE_SUCCESS,
            payload: response.data
        });

        alert("Profile has been updated");
    } catch (err) {
        dispatch({
            type: actions.EDIT_PROFILE_FAILURE,
            payload: "updating user profile failed"
        });
    }
};

export const logOutAction = () => async dispatch => {
    try {
        let response = await axios({
            method: "PUT",
            url: "/clients/logout",
            headers: { Authorization: localStorage.getItem("Authorization") }
        });

        dispatch({
            type: actions.LOGOUT_SUCCESS
        });

        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");


        return 200;
    } catch (err) {
        dispatch({
            type: actions.LOGOUT_FAILURE,
            payload: "Log Out failed, please to try again"
        });
    }
};

export const addFavoriteAnnoncement = annoncement => async dispatch => {
    try {
        let response = await axios({
            method: "PUT",
            data: { annoncementId: annoncement },
            headers: { Authorization: localStorage.getItem("Authorization") },
            url: "/clients/add-favorite"
        });
        dispatch({
            type: actions.ADD_FAVORITE_ANNONCEMENT_SUCCESS,
            payload: annoncement
        });
        alert("Annoncement was added to favorites");
    } catch (err) {
        alert("Adding annoncement to favorites failed, please to try again");
    }
};

export const getFavoritesAnnoncement = () => async dispatch => {
    try {
        let response = await axios({
            method: "GET",
            headers: { Authorization: localStorage.getItem("Authorization") },
            url: "/clients/favorites"
        });

        dispatch({
            type: actions.FETCH_MY_FAVORITES_ANNONCEMENTS_LIST_SUCCESS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: actions.FETCH_MY_FAVORITES_ANNONCEMENTS_LIST_FAILURE,
            payload: err
        });
    }
};

export const deleteFavoriteAnnoncement = annoncement => async dispatch => {
    try {
        let response = await axios({
            method: "PUT",
            data: { annoncementId: annoncement },
            headers: { Authorization: localStorage.getItem("Authorization") },
            url: "/clients/delete-favorite"
        });
        dispatch({
            type: actions.DELETE_FAVORITE_ANNONCEMENT_SUCCESS,
            payload: annoncement
        });
        alert("Annoncement was deleted from favorites");
    } catch (err) {
        alert("Deleting annoncement from favorites failed, please to try again");
    }
};