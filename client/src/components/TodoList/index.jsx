import { AnimatePresence } from "framer-motion";
import TodoItem from "../TodoItem";
import "./TodoList.css";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEditTitle,
  onEditDesc,
}) {
  return (
    <ul className="todo-list" aria-label="Task list" role="list">
      <AnimatePresence initial={false}>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            onToggle={onToggle}
            onDelete={onDelete}
            onEditTitle={onEditTitle}
            onEditDesc={onEditDesc}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
