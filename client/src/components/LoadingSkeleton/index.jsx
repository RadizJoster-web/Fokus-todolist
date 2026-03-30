import "./LoadingSkeleton.css";

function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

function SkeletonStats() {
  return (
    <div className="skeleton-stats">
      <div className="skeleton-progress">
        <SkeletonBlock className="skeleton--text skeleton--w60" />
        <SkeletonBlock className="skeleton--bar" />
      </div>
      <div className="skeleton-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <SkeletonBlock className="skeleton--icon" />
            <SkeletonBlock className="skeleton--number" />
            <SkeletonBlock className="skeleton--text skeleton--w80" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="skeleton-list">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="skeleton-item"
          style={{ opacity: 1 - i * 0.15 }}
        >
          <SkeletonBlock className="skeleton--check" />
          <div className="skeleton-item__body">
            <SkeletonBlock
              className={`skeleton--text ${i % 2 === 0 ? "skeleton--w80" : "skeleton--w60"}`}
            />
            <SkeletonBlock className="skeleton--text skeleton--w40 skeleton--sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton({ variant = "list" }) {
  return variant === "stats" ? <SkeletonStats /> : <SkeletonList />;
}
