import { motion } from "framer-motion";
import "./TodoFilter.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

export default function TodoFilter({ filter, setFilter, stats }) {
  const counts = {
    all: stats.total,
    active: stats.active,
    completed: stats.completed,
  };

  return (
    <nav className="todo-filter" aria-label="Filter tasks">
      <div className="todo-filter__tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`todo-filter__tab ${filter === f.key ? "todo-filter__tab--active" : ""}`}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
          >
            {filter === f.key && (
              <motion.span
                className="todo-filter__indicator"
                layoutId="filter-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="todo-filter__label">{f.label}</span>
            {counts[f.key] > 0 && (
              <span className="todo-filter__badge">{counts[f.key]}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
