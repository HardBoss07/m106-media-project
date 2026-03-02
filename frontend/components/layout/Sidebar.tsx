import { FILTER_CATEGORIES } from '../../constants/filters';

const Sidebar = () => {
  return (
    <aside className="layout-sidebar">
      <div className="space-y-8">
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="filter-category-title">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.options.map((option) => (
                <label
                  key={option}
                  className="filter-checkbox-label"
                >
                  <input
                    type="checkbox"
                    className="filter-checkbox-input"
                  />
                  <span>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
