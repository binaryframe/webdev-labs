import { useEffect, useState } from 'react';
import Select from '../components/Select';
import SearchInput from '../components/SearchInput';
import PrimaryButton from '../components/PrimaryButton';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';
import { getLuminaires, withMinDelay } from '../api/luminaires';
import { types, manufacturers, powers } from '../constants';

const empty = { type: '', manufacturer: '', power: '' };

export default function CatalogPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const [search, setSearch] = useState('');

  const change = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  useEffect(() => {
    setLoading(true);
    setError('');
    withMinDelay(getLuminaires(applied))
      .then(setItems)
      .catch(() => setError('Failed to load items.'))
      .finally(() => setLoading(false));
  }, [applied]);

  const visible = items.filter(i =>
    [i.name, i.type, i.manufacturer, i.description].some(t => (t || '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container">
      <div className="toolbar">
        <Select name="type" value={filters.type} onChange={change} placeholder="Type" options={types} />
        <Select name="manufacturer" value={filters.manufacturer} onChange={change} placeholder="Manufacturer" options={manufacturers} />
        <Select name="power" value={filters.power} onChange={change} placeholder="Power" options={powers} />
        <PrimaryButton outline onClick={() => setApplied(filters)}>Apply</PrimaryButton>
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {loading && <Spinner />}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="grid">
          {visible.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      )}
      {!loading && !error && visible.length === 0 && <p>No items found.</p>}
    </div>
  );
}
