import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actionTypes.js/actionTypes';

// Action to login the user
export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/login', { email, password });

        if (response.status === 200) {
            // Assuming the response contains user data
            const userData = response.data;

            // Dispatch success action with user data
            dispatch({
                type: LOGIN_SUCCESS,
                payload: userData,
            });
            console.log("user data is "+userData.token);
            return userData; // Optionally return the user data
        }
    } catch (error) {
        const errorMsg = error.response && error.response.data ? error.response.data : 'Login failed';

        // Dispatch fail action with error message
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMsg,
        });

        throw error; // Throw error if needed for further handling
    }
};

// Action to logout the user
export const logout = () => (dispatch) => {
    // Perform any necessary cleanup like removing tokens from localStorage if needed

    // Dispatch logout action to reset auth state
    dispatch({
        type: LOGOUT,
    });
};
