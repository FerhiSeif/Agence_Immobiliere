import axios from "axios";
import * as actions from "./ActionsDef";

export const getagents = () => async dispatch => {
    try {
        let response = await axios({
            method: "GET",
            url: "/clients/agents/all",
            headers: { Authorization: localStorage.getItem("Authorization") }
        });

        dispatch({
            type: actions.FETCH_AJENTS_SUCCESS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: actions.FETCH_AJENTS_FAILURE,
            payload: "Fetching ajents failed, please to try again "
        });
    }
};