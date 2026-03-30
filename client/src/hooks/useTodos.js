import { useState, useCallback, useMemo, useEffect } from "react";
import * as api from "../services/api";

function normalizeTodo(raw) {
  return {
    id: raw.task_id,
    text: raw.title,
    description: raw.desc || "",
    completed: String(raw.status) === "1",
    status: String(raw.status),
    dueDate: raw.due_date || null,
    createdAt: raw.created_at || new Date().toISOString(),
    updatedAt: raw.update_at || null,
  };
}

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /* ── FETCH ALL ──────────────────────────────────────────── */
  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.fetchTodos();
      const list = Array.isArray(data) ? data : (data?.data ?? []);
      setTodos(list.map(normalizeTodo));
    } catch (err) {
      setError(err.message || "Failed to load tasks.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  /* ── CREATE ─────────────────────────────────────────────── */
  const addTodo = useCallback(
    async (text, description = "") => {
      if (!text.trim()) return;
      setIsSubmitting(true);
      setError(null);

      const tempId = `temp-${Date.now()}`;
      const optimistic = {
        id: tempId,
        text: text.trim(),
        description: description.trim(),
        completed: false,
        status: "0",
        dueDate: null,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        _pending: true,
      };
      setTodos((prev) => [optimistic, ...prev]);

      try {
        await api.createTodo({ title: text.trim(), desc: description.trim() });
        await loadTodos();
      } catch (err) {
        setTodos((prev) => prev.filter((t) => t.id !== tempId));
        setError(err.message || "Failed to create task.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadTodos],
  );

  /* ── TOGGLE STATUS ──────────────────────────────────────── */
  const toggleTodo = useCallback(
    async (id) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      // Optimistic toggle
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: !t.completed,
                status: t.status === "0" ? "1" : "0",
              }
            : t,
        ),
      );

      try {
        await api.updateTodoStatus(id, todo.status);
      } catch (err) {
        // Rollback
        setTodos((prev) =>
          prev.map((t) =>
            t.id === id
              ? { ...t, completed: todo.completed, status: todo.status }
              : t,
          ),
        );
        setError(err.message || "Failed to update task status.");
      }
    },
    [todos],
  );

  /* ── DELETE ─────────────────────────────────────────────── */
  const deleteTodo = useCallback(
    async (id) => {
      const snapshot = [...todos];
      setTodos((prev) => prev.filter((t) => t.id !== id));
      try {
        await api.deleteTodo(id);
      } catch (err) {
        setTodos(snapshot);
        setError(err.message || "Failed to delete task.");
      }
    },
    [todos],
  );

  /* ── EDIT TITLE ─────────────────────────────────────────── */
  const editTitle = useCallback(
    async (id, newTitle) => {
      if (!newTitle.trim()) return;

      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const previousText = todo.text;

      // Optimistic: update teks di UI langsung
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: newTitle.trim() } : t)),
      );

      try {
        await api.updateTodoTitle(id, newTitle.trim());
      } catch (err) {
        // Rollback ke teks sebelumnya jika gagal
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, text: previousText } : t)),
        );
        setError(err.message || "Failed to update task title.");
      }
    },
    [todos],
  );

  /* ── EDIT DESC ──────────────────────────────────────────── */
  const editDesc = useCallback(
    async (id, newDesc) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const previousDesc = todo.description;

      // Optimistic: update desc di UI langsung
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, description: newDesc.trim() } : t,
        ),
      );

      try {
        await api.updateTodoDesc(id, newDesc.trim());
      } catch (err) {
        // Rollback
        setTodos((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, description: previousDesc } : t,
          ),
        );
        setError(err.message || "Failed to update task description.");
      }
    },
    [todos],
  );

  /* ── CLEAR COMPLETED ────────────────────────────────────── */
  const clearCompleted = useCallback(async () => {
    const completed = todos.filter((t) => t.completed);
    if (!completed.length) return;
    const snapshot = [...todos];
    setTodos((prev) => prev.filter((t) => !t.completed));
    try {
      await Promise.all(completed.map((t) => api.deleteTodo(t.id)));
    } catch (err) {
      setTodos(snapshot);
      setError(err.message || "Failed to clear completed tasks.");
    }
  }, [todos]);

  /* ── DISMISS ERROR ──────────────────────────────────────── */
  const dismissError = useCallback(() => setError(null), []);

  /* ── FILTERED + SORTED ──────────────────────────────────── */
  const filteredTodos = useMemo(() => {
    const sorted = [...todos].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.dueDate && b.dueDate)
        return new Date(a.dueDate) - new Date(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    switch (filter) {
      case "active":
        return sorted.filter((t) => !t.completed);
      case "completed":
        return sorted.filter((t) => t.completed);
      default:
        return sorted;
    }
  }, [todos, filter]);

  /* ── STATS ──────────────────────────────────────────────── */
  const stats = useMemo(() => {
    const now = new Date();
    return {
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
      overdue: todos.filter(
        (t) => !t.completed && t.dueDate && new Date(t.dueDate) < now,
      ).length,
    };
  }, [todos]);

  return {
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTitle,
    editDesc, // ✅ ganti onEdit lama
    clearCompleted,
    filteredTodos,
    stats,
    isLoading,
    isSubmitting,
    error,
    dismissError,
    refetch: loadTodos,
  };
}
