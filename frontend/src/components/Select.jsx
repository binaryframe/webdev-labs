export default function Select({ label, options, placeholder, ...rest }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <select className="input" {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
    </label>
  );
}
