import { FETCH_INVENTORY_SUCCESS, UPDATE_INVENTORY } from '../actionTypes';

// Fetch Inventory Action
export const fetchInventorySuccess = (inventory) => ({
  type: FETCH_INVENTORY_SUCCESS,
  payload: inventory,
});

// Update Inventory Action
export const updateInventory = (id, updatedQuantity) => ({
  type: UPDATE_INVENTORY,
  payload: { id, updatedQuantity },
});
