import { useContext, useState } from 'react';
import Select from '../components/Select';
import SearchInput from '../components/SearchInput';
import PrimaryButton from '../components/PrimaryButton';
import ItemCard from '../components/ItemCard';
import { ItemsContext } from '../context/ItemsContext';
import { types, manufacturers, powers } from '../constants';

const empty = { type: '', manufacturer: '', power: '' };

export default function CatalogPage() {
  const { items } = useContext(ItemsContext);
  const [filters, setFilters] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const [search, setSearch] = useState('');

  const change = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  const visible = items.filter(i =>
    (!applied.type || i.type === applied.type) &&
    (!applied.manufacturer || i.manufacturer === applied.manufacturer) &&
    (!applied.power || i.power >= Number(applied.power)) &&
    [i.name, i.type, i.manufacturer, i.description].some(t => t.toLowerCase().includes(search.toLowerCase()))
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
      <div className="grid">
        {visible.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
      {visible.length === 0 && <p>No items found.</p>}
    </div>
  );
}
