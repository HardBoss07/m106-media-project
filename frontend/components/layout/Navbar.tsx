'use client';

import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onAppModeChange: (mode: string) => void;
  onToggleSidebar: () => void;
  appMode: string;
}

const Header = ({ onSearch, onAppModeChange, onToggleSidebar, appMode }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <header id="hdr">
      <div className="hd-left">
        <button className="icon-btn" id="menu-btn" title="Menü" onClick={onToggleSidebar}>
          <Menu className="w-5 h-5" />
        </button>
        <a className="logo" href="#" onClick={(e) => e.preventDefault()}>
          <img src="/logo.svg" className="logo-mark" alt="MyLights" />
          <span className="logo-text">My<em>Lights</em></span>
        </a>
      </div>

      <div id="hd-search-area" className="hd-search">
        <form onSubmit={handleSearch} className="flex flex-1">
          <div className="search-wrap">
            <Search className="w-4 h-4 mr-2" style={{ color: 'var(--text3)', flexShrink: 0 }} />
            <input 
              id="sq" 
              type="text" 
              placeholder="Suchen…" 
              autoComplete="off" 
              spellCheck="false"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value === '') onSearch('');
              }}
            />
            {searchQuery && (
              <button 
                id="sx" 
                type="button"
                className="search-x vis" 
                onClick={clearSearch} 
                title="Löschen"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="search-go" title="Suchen">
            <Search className="w-[18px] h-[18px]" />
          </button>
        </form>
      </div>

      <nav className="hd-nav">
        <button 
          className={`hd-nav-btn ${appMode === 'mylightshub' ? 'active' : ''}`} 
          onClick={() => onAppModeChange('mylightshub')}
        >
          MyLights Hub
        </button>
      </nav>
    </header>
  );
};

export default Header;
