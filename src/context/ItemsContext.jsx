import { createContext, useState } from 'react';
import { luminaires } from '../data/luminaires';

export const ItemsContext = createContext({ items: [] });

export function ItemsProvider({ children }) {
  const [items] = useState(luminaires);
  return <ItemsContext.Provider value={{ items }}>{children}</ItemsContext.Provider>;
}
