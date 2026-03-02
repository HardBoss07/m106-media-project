import { Menu } from 'lucide-react';
import SearchBar from '../UI/SearchBar';

const Navbar = () => {
  return (
    <nav className="layout-nav">
      <div className="flex items-center gap-4">
        <img 
          src="logo.svg" 
          alt="mylights Logo" 
          className="w-50 h-10 rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 flex justify-center px-4">
        <SearchBar />
      </div>

      <div className="flex items-center">
        <button className="btn-icon">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
