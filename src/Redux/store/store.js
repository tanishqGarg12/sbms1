// src/redux/store/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // For handling async actions
import authReducer from '../reducers/authReducer'; // Update path if needed

// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer, // Add your authReducer here
});

// Create the Redux store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk) // Apply thunk middleware for async actions
);

export default store;
