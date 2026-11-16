const filters = [
    {id: 'all', label: 'All Tasks'},
    {id: 'active', label: 'Pending'},
    {id: 'completed', label: 'Complete'},
];

export default function TaskFilter({currentFilter, onFilterChange}) {
    return (
        <nav className="filter-bar" aria-label="Filter Tasks">
            {filters.map((filter)=> (
                <button
                 key={filter.id}
                 className={`filter-button${currentFilter === filter.id ? ' is-active' : ''}`}
                 type="button"
                 onClick={() => onFilterChange(filter.id)}
                 aria-pressed={currentFilter === filter.id}>
                    {filter.label}
                </button>
            ))}
        </nav>
    );
}
