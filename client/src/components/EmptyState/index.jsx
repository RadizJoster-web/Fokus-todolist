import { motion } from "framer-motion";
import "./EmptyState.css";

const EMPTY_COPY = {
  all: {
    emoji: "✨",
    title: "Clean slate!",
    desc: "Add your first task above to get started.",
  },
  active: {
    emoji: "🎉",
    title: "All done!",
    desc: "No active tasks. Great job!",
  },
  completed: {
    emoji: "📋",
    title: "Nothing yet",
    desc: "Complete some tasks to see them here.",
  },
};

export default function EmptyState({ filter }) {
  const copy = EMPTY_COPY[filter] || EMPTY_COPY.all;

  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      role="status"
      aria-live="polite"
    >
      <motion.span
        className="empty-state__emoji"
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {copy.emoji}
      </motion.span>
      <h3 className="empty-state__title">{copy.title}</h3>
      <p className="empty-state__desc">{copy.desc}</p>
    </motion.div>
  );
}
