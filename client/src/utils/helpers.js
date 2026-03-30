export const formatDate = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDueDate = (iso) => {
  if (!iso) return null;
  const due = new Date(iso);
  const now = new Date();
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Overdue", variant: "overdue" };
  if (diffDays === 0) return { label: "Due today", variant: "today" };
  if (diffDays === 1) return { label: "Due tomorrow", variant: "soon" };
  if (diffDays <= 3)
    return { label: `Due in ${diffDays} days`, variant: "soon" };
  return {
    label: due.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    variant: "normal",
  };
};
