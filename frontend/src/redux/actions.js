export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const addToCart = (item, quantity, color) => ({ type: ADD_TO_CART, payload: { item, quantity, color } });
export const increment = id => ({ type: INCREMENT, payload: id });
export const decrement = id => ({ type: DECREMENT, payload: id });
export const CLEAR_CART = 'CLEAR_CART';
export const clearCart = () => ({ type: CLEAR_CART });
