import './CategoryFilter.css';

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="catfilter">
      <span className="catfilter-title">Kategori</span>
      <div className="catfilter-chips">
        <button
          type="button"
          className={`catfilter-chip${!selected ? ' active' : ''}`}
          onClick={() => onSelect('')}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`catfilter-chip${selected === cat ? ' active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            #
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
