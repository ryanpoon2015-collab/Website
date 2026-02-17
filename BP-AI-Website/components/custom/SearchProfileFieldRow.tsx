interface SearchProfileFieldRowProps {
  label: string;
  value: string;
}

const SearchProfileFieldRow: React.FC<SearchProfileFieldRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className="wf rsc-2 t-white">
      <p className="t43 o-75">{label}:</p>
      <p className="t45">{value}</p>
    </div>
  );
};

export default SearchProfileFieldRow;
