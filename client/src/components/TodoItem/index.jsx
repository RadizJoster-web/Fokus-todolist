import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCheckLine,
  RiDeleteBinLine,
  RiPencilLine,
  RiCloseLine,
  RiCheckFill,
  RiArrowDownSLine,
  RiCalendarLine,
} from "react-icons/ri";
import { formatDate, formatDueDate } from "../../utils/helpers";
import "./TodoItem.css";

export default function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEditTitle,
  onEditDesc,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDesc, setEditDesc] = useState(todo.description);
  const [descExpanded, setDescExpanded] = useState(false);
  const titleRef = useRef(null);

  const hasDesc = !!todo.description;
  const dueDateInfo = formatDueDate(todo.dueDate);

  const handleEditStart = () => {
    setEditText(todo.text);
    setEditDesc(todo.description);
    setIsEditing(true);
    setDescExpanded(false); // tutup desc view saat masuk edit mode
    setTimeout(() => titleRef.current?.focus(), 50);
  };

  const handleEditSave = async () => {
    const titleChanged = editText.trim() !== todo.text;
    const descChanged = editDesc.trim() !== todo.description;

    if (!editText.trim()) return; // title wajib ada isinya

    if (titleChanged) await onEditTitle(todo.id, editText);
    if (descChanged) await onEditDesc(todo.id, editDesc);

    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    // Enter hanya di title field yang save, di textarea biarkan newline
  };

  return (
    <motion.li
      className={`todo-item ${todo.completed ? "todo-item--done" : ""} ${
        dueDateInfo?.variant === "overdue" && !todo.completed
          ? "todo-item--overdue"
          : ""
      }`}
      layout
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.92 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
        delay: index * 0.03,
      }}
    >
      <div className="todo-item__accent-bar" />

      {/* Checkbox — disabled saat edit mode */}
      <button
        className={`todo-item__check ${todo.completed ? "todo-item__check--done" : ""}`}
        onClick={() => !isEditing && onToggle(todo.id)}
        aria-label={todo.completed ? "Mark as active" : "Mark as complete"}
        disabled={isEditing}
      >
        {todo.completed && <RiCheckLine />}
      </button>

      <div className="todo-item__body">
        {isEditing ? (
          /* ── EDIT MODE ── */
          <div className="todo-item__edit-wrap">
            <input
              ref={titleRef}
              className="todo-item__edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                handleKeyDown(e);
                if (e.key === "Enter") handleEditSave();
              }}
              maxLength={120}
              placeholder="Task title..."
              aria-label="Edit title"
            />
            <textarea
              className="todo-item__edit-textarea"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={300}
              rows={2}
              placeholder="Description (optional)..."
              aria-label="Edit description"
            />
            <span className="todo-item__edit-count">{editDesc.length}/300</span>
          </div>
        ) : (
          /* ── VIEW MODE ── */
          <>
            <span className="todo-item__text">{todo.text}</span>

            <AnimatePresence initial={false}>
              {hasDesc && descExpanded && (
                <motion.p
                  className="todo-item__desc"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 6 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  {todo.description}
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Meta row — selalu tampil */}
        <div className="todo-item__meta">
          {dueDateInfo && !todo.completed && (
            <span
              className={`todo-item__due todo-item__due--${dueDateInfo.variant}`}
            >
              <RiCalendarLine />
              {dueDateInfo.label}
            </span>
          )}
          <span className="todo-item__date">{formatDate(todo.createdAt)}</span>

          {/* Desc toggle — hanya di view mode dan kalau ada desc */}
          {hasDesc && !isEditing && (
            <button
              className={`todo-item__desc-toggle ${descExpanded ? "todo-item__desc-toggle--open" : ""}`}
              onClick={() => setDescExpanded((v) => !v)}
              aria-label={
                descExpanded ? "Hide description" : "Show description"
              }
              aria-expanded={descExpanded}
              type="button"
            >
              <span>desc</span>
              <motion.span
                animate={{ rotate: descExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <RiArrowDownSLine />
              </motion.span>
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="todo-item__actions">
        {isEditing ? (
          <>
            <motion.button
              className="todo-item__btn todo-item__btn--save"
              onClick={handleEditSave}
              whileTap={{ scale: 0.9 }}
              aria-label="Save"
              title="Save (Enter)"
            >
              <RiCheckFill />
            </motion.button>
            <motion.button
              className="todo-item__btn"
              onClick={() => setIsEditing(false)}
              whileTap={{ scale: 0.9 }}
              aria-label="Cancel"
              title="Cancel (Esc)"
            >
              <RiCloseLine />
            </motion.button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <motion.button
                className="todo-item__btn"
                onClick={handleEditStart}
                whileTap={{ scale: 0.9 }}
                aria-label="Edit task"
                title="Edit title & description"
              >
                <RiPencilLine />
              </motion.button>
            )}
            <motion.button
              className="todo-item__btn todo-item__btn--delete"
              onClick={() => onDelete(todo.id)}
              whileTap={{ scale: 0.9 }}
              aria-label="Delete task"
            >
              <RiDeleteBinLine />
            </motion.button>
          </>
        )}
      </div>
    </motion.li>
  );
}
