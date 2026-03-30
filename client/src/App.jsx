import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import EmptyState from "./components/EmptyState";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorToast from "./components/ErrorToast";
import { useTodos } from "./hooks/useTodos";
import { useTheme } from "./hooks/useTheme";
import "./styles/index.css";

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTitle,
    editDesc,
    clearCompleted,
    filteredTodos,
    stats,
    isLoading,
    isSubmitting,
    error,
    dismissError,
  } = useTodos();

  return (
    <div className="app" data-theme={theme}>
      <div className="glass-bg">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
      </div>

      <div className="app__container">
        <motion.aside
          className="app__sidebar"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Header theme={theme} toggleTheme={toggleTheme} />
          {isLoading ? (
            <LoadingSkeleton variant="stats" />
          ) : (
            <TodoStats stats={stats} />
          )}
        </motion.aside>

        <motion.main
          className="app__main"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div className="glass-panel">
            <TodoInput onAdd={addTodo} isSubmitting={isSubmitting} />
            <TodoFilter filter={filter} setFilter={setFilter} stats={stats} />

            <div className="todo-scroll-area">
              {isLoading ? (
                <LoadingSkeleton variant="list" />
              ) : filteredTodos.length === 0 ? (
                <EmptyState filter={filter} />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEditTitle={editTitle}
                  onEditDesc={editDesc}
                />
              )}
            </div>

            <AnimatePresence>
              {stats.completed > 0 && !isLoading && (
                <motion.div
                  className="clear-completed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <button
                    className="btn btn--ghost btn--sm"
                    onClick={clearCompleted}
                  >
                    Clear completed ({stats.completed})
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.main>
      </div>

      <ErrorToast message={error} onDismiss={dismissError} />
    </div>
  );
}

export default App;
