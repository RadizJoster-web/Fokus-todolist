import { motion } from "framer-motion";
import {
  RiTodoLine,
  RiCheckboxCircleLine,
  RiFireLine,
  RiAlarmWarningLine,
} from "react-icons/ri";
import "./TodoStats.css";

const statConfig = [
  {
    key: "total",
    label: "Total Tasks",
    icon: RiTodoLine,
    color: "var(--accent)",
  },
  {
    key: "active",
    label: "In Progress",
    icon: RiFireLine,
    color: "var(--info)",
  },
  {
    key: "completed",
    label: "Completed",
    icon: RiCheckboxCircleLine,
    color: "var(--success)",
  },
  {
    key: "overdue",
    label: "Overdue",
    icon: RiAlarmWarningLine,
    color: "var(--danger)",
  },
];

export default function TodoStats({ stats }) {
  const progress =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="todo-stats">
      <div className="todo-stats__progress-wrap">
        <div className="todo-stats__progress-header">
          <span className="todo-stats__progress-label">Overall Progress</span>
          <span className="todo-stats__progress-pct">{progress}%</span>
        </div>
        <div className="todo-stats__progress-bar">
          <motion.div
            className="todo-stats__progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="todo-stats__grid">
        {statConfig.map(({ key, label, icon: Icon, color }, i) => (
          <motion.div
            key={key}
            className="stat-card"
            style={{ "--s-color": color }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <div className="stat-card__icon">
              <Icon />
            </div>
            <motion.span
              className="stat-card__value"
              key={stats[key]}
              initial={{ scale: 1.3, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {stats[key]}
            </motion.span>
            <span className="stat-card__label">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
