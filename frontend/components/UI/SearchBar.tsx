import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-primary-text" />
      </div>
      <input
        type="search"
        className="search-input"
        placeholder="Medien suchen..."
        required
      />
    </div>
  );
};

export default SearchBar;
