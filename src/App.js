import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import { ItemsProvider } from './context/ItemsContext';

export default function App() {
  return (
    <ItemsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<ItemPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ItemsProvider>
  );
}
