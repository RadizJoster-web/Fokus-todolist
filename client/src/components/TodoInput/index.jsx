import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiAddLine, RiFileTextLine, RiLoaderLine } from "react-icons/ri";
import "./TodoInput.css";

export default function TodoInput({ onAdd, isSubmitting = false }) {
  const [text, setText] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);
  const descRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    onAdd(text, description);
    setText("");
    setDescription("");
    setShowDesc(false);
    inputRef.current?.focus();
  };

  const handleToggleDesc = () => {
    setShowDesc((v) => {
      if (!v) setTimeout(() => descRef.current?.focus(), 80);
      else setDescription("");
      return !v;
    });
  };

  return (
    <form
      className="todo-input"
      onSubmit={handleSubmit}
      aria-label="Add new task"
    >
      <div className="todo-input__row">
        <div className="todo-input__field">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input__text"
            maxLength={120}
            aria-label="Task title"
            autoComplete="off"
          />
        </div>
        <motion.button
          type="submit"
          className={`btn btn--primary btn--icon ${isSubmitting ? "btn--loading" : ""}`}
          disabled={!text.trim() || isSubmitting}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Add task"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? <RiLoaderLine className="spin" /> : <RiAddLine />}
        </motion.button>
      </div>

      <label className="desc-toggle">
        <input
          type="checkbox"
          className="desc-toggle__checkbox"
          checked={showDesc}
          onChange={handleToggleDesc}
        />
        <span className="desc-toggle__box">
          <AnimatePresence>
            {showDesc && (
              <motion.span
                className="desc-toggle__check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <RiFileTextLine className="desc-toggle__icon" />
        <span className="desc-toggle__label">Add description</span>
      </label>

      <AnimatePresence>
        {showDesc && (
          <motion.div
            className="desc-input-wrap"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <textarea
              ref={descRef}
              className="desc-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a short description (optional)..."
              maxLength={300}
              rows={3}
              aria-label="Task description"
            />
            <span className="desc-input__count">{description.length}/300</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
