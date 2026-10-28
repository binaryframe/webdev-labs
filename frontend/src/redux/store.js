import { legacy_createStore as createStore } from 'redux';
import cartReducer from './reducers';

const load = () => {
  try { return JSON.parse(localStorage.getItem('cart')) || undefined; } catch { return undefined; }
};

export const store = createStore(cartReducer, load());

store.subscribe(() => localStorage.setItem('cart', JSON.stringify(store.getState())));
