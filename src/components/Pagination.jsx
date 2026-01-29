export default function Pagination({
  currentPage,
  setPage,
  totalItems,
  perPage,
}) {
  const totalPages = Math.ceil(totalItems / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 md:mt-12 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={currentPage <= 1}
        className="
          px-5 sm:px-6 py-2.5 rounded-lg glass font-medium text-sm sm:text-base
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-surface2 hover:text-primary transition-colors
          border border-border/50 disabled:border-border/30
        "
      >
        ← Previous
      </button>

      <span className="px-4 py-2.5 font-semibold text-base sm:text-lg">
        {currentPage}
        <span className="text-muted-foreground ml-1.5">/ {totalPages}</span>
      </span>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={currentPage >= totalPages}
        className="
          px-5 sm:px-6 py-2.5 rounded-lg glass font-medium text-sm sm:text-base
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-surface2 hover:text-primary transition-colors
          border border-border/50 disabled:border-border/30
        "
      >
        Next →
      </button>
    </div>
  );
}
