import { FETCH_INVENTORY_SUCCESS, UPDATE_INVENTORY } from '../actionTypes';

const initialState = {
  products: [],
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATE_INVENTORY:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.id
            ? { ...product, quantity: action.payload.updatedQuantity }
            : product
        ),
      };
    default:
      return state;
  }
};
