import Select from '../components/Select';
import SearchInput from '../components/SearchInput';
import PrimaryButton from '../components/PrimaryButton';
import ItemCard from '../components/ItemCard';
import { luminaires } from '../data/luminaires';

const types = ['Panel Light', 'Street Light', 'Downlight', 'Flood Light', 'Track Light', 'High Bay Light'];
const manufacturers = ['Philips', 'Osram', 'Ledvance', 'Eglo', 'Svitlo'];
const powers = [{ value: '20', label: '20 W and more' }, { value: '50', label: '50 W and more' }, { value: '100', label: '100 W and more' }];

export default function CatalogPage() {
  return (
    <div className="container">
      <div className="toolbar">
        <Select placeholder="Type" options={types} />
        <Select placeholder="Manufacturer" options={manufacturers} />
        <Select placeholder="Power" options={powers} />
        <PrimaryButton outline>Apply</PrimaryButton>
        <SearchInput />
      </div>
      <div className="grid">
        {luminaires.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
