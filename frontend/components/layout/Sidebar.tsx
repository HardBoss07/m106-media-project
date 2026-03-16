'use client';

import { 
  Home, 
  Heart, 
  History, 
  ListMusic, 
  LayoutGrid, 
  Settings, 
  Plus 
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  isCollapsed: boolean;
}

const Sidebar = ({ 
  activeView, 
  onViewChange, 
  categories, 
  activeCategory, 
  onCategoryChange,
  isCollapsed 
}: SidebarProps) => {
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'liked', label: 'Favoriten', icon: Heart },
    { id: 'history', label: 'Verlauf', icon: History },
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'categories', label: 'Kategorien', icon: LayoutGrid },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
  ];

  return (
    <aside id="sidebar" className={isCollapsed ? 'col' : ''}>
      <div className="ss">
        <div className="ss-title">Navigation</div>
        {navItems.map((item) => (
          <div 
            key={item.id}
            className={`si ${activeView === item.id ? 'active' : ''}`}
            id={`nav-${item.id}`}
            onClick={() => onViewChange(item.id)}
          >
            <div className="si-ico">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="si-lbl">{item.label}</span>
          </div>
        ))}
      </div>

      {activeView === 'home' && (
        <div className="ss" id="cat-section">
          <div className="ss-title">Kategorien</div>
          <div id="cat-list">
            <div 
              className={`cat-pill ${activeCategory === '' ? 'active' : ''}`} 
              onClick={() => onCategoryChange('')}
            >
              <span className="cat-pill-name">Alle Videos</span>
            </div>
            {categories.map(cat => (
              <div 
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                <span className="cat-pill-name">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '12px 10px 20px' }}>
        <button 
          className="btn red" 
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => alert('Funktion "Ordner hinzufügen" ist in Vorbereitung.')}
        >
          <Plus className="w-[15px] h-[15px]" />
          <span className="si-lbl">Ordner hinzufügen</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
