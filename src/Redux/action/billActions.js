import { ADD_TO_BILL } from '../actionTypes';

// Add to Bill Action
export const addToBill = (item) => ({
  type: ADD_TO_BILL,
  payload: item,
});
