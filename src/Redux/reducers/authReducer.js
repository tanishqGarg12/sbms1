
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actionTypes.js/actionTypes';

const initialState = {
    user: null,
    error: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
