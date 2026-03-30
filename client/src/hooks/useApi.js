import { useState, useCallback } from "react";

/**
 * useApi — wraps an async function with loading + error state.
 *
 * Usage:
 *   const { execute, loading, error } = useApi(createTodo);
 *   await execute({ title, desc });
 */
export function useApi(apiFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFn(...args);
        return result;
      } catch (err) {
        setError(err.message || "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn],
  );

  return { execute, loading, error };
}
