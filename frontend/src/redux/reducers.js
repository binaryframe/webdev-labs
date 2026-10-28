import { ADD_TO_CART, INCREMENT, DECREMENT } from './actions';

const initialState = { items: [] };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { item, quantity, color } = action.payload;
      const key = `${item.id}-${color}`;
      const exists = state.items.some(i => i.key === key);
      const items = exists
        ? state.items.map(i => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
        : [...state.items, { key, id: item.id, name: item.name, color, price: Number(item.price), quantity }];
      return { ...state, items };
    }
    case INCREMENT:
      return { ...state, items: state.items.map(i => (i.key === action.payload ? { ...i, quantity: i.quantity + 1 } : i)) };
    case DECREMENT:
      return {
        ...state,
        items: state.items
          .map(i => (i.key === action.payload ? { ...i, quantity: i.quantity - 1 } : i))
          .filter(i => i.quantity > 0)
      };
    default:
      return state;
  }
}
