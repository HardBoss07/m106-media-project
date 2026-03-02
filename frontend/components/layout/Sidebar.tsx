'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FILTER_CATEGORIES } from '../../constants/filters';

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (title: string, option: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (title === 'Medientyp') {
      const currentType = params.get('type');
      if (currentType === option) {
        params.delete('type'); // Toggle off if already selected
      } else {
        params.set('type', option); // Set specific type (Foto, Video, Sound)
      }
    } else if (title === 'Kategorie') {
      const currentQ = params.get('q');
      if (currentQ === option) {
        params.delete('q'); // Toggle off if already selected
      } else {
        params.set('q', option); // Set specific category as a simple query
      }
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <aside className="layout-sidebar">
      <div className="space-y-8">
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="filter-category-title">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.options.map((option) => {
                const isSelected = 
                  (category.title === 'Medientyp' && searchParams.get('type') === option) ||
                  (category.title === 'Kategorie' && searchParams.get('q') === option);

                return (
                  <label
                    key={option}
                    className="filter-checkbox-label"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleFilterChange(category.title, option)}
                      className="filter-checkbox-input"
                    />
                    <span className={isSelected ? 'text-primary-accent' : ''}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
