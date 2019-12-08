import * as actions from "../ActionsDef";

let agentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_AJENTS_SUCCESS:
            return {
                agents: action.payload,
                error: "",
                collectionLength:''
                // collectionLength: action.payload.length % 3 === 0 ?
                //     action.payload.length / 3 : Math.floor(action.payload.length / 3) + 1
            };
        case actions.FETCH_AJENTS_FAILURE:
            return { mesProprietes: [], error: action.payload, collectionLength: 1 };
        default:
            return state;
    }
};

export default agentsReducer;

const initialState = {
    agents: [],
    error: "",
    collectionLength: 1
};