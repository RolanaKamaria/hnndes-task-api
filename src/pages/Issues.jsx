import { useGitHubIssues } from "../hooks/useGitHubIssues";
import IssueCard from "../components/IssueCard";
import Pagination from "../components/Pagination";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selected = options.find((opt) => opt.value === value);
  const display = selected ? selected.label : placeholder;

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          w-full px-5 py-3.5 glass rounded-xl border border-[hsl(var(--border))]
          flex items-center justify-between
          text-left hover:border-[hsl(var(--accent))/0.6] transition-colors
          focus:outline-none focus:border-[hsl(var(--accent))]
        `}
      >
        <span className={value ? "" : "text-[hsl(var(--muted))]"}>
          {display}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full left-0 mt-2 w-full
            glass rounded-xl border border-[hsl(var(--border))]
            shadow-xl z-20 overflow-hidden py-1.5 
            max-h-[min(320px,calc(100vh-180px))] overflow-y-auto
          `}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-5 py-2 text-left
                hover:bg-blue-200 transition-colors
   
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Issues() {
  const {
    issues,
    loading,
    error,
    page,
    setPage,
    totalCount,
    perPage,
    searchTerm,
    setSearchTerm,
    stateFilter,
    setStateFilter,
    sort,
    setSort,
    direction,
    setDirection,
  } = useGitHubIssues();

  const stateOptions = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "all", label: "All" },
  ];

  const sortOptions = [
    { value: "created", label: "Created" },
    { value: "updated", label: "Updated" },
    { value: "comments", label: "Comments" },
  ];

  const directionOptions = [
    { value: "desc", label: "Newest ↓" },
    { value: "asc", label: "Oldest ↑" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.4)] bg-[hsl(var(--surface)/0.6)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">
            React Issues
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 py-10">
        <div className="mb-10 flex flex-col sm:flex-row gap-4 flex-wrap">
          <input
            type="search"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-5 py-3.5 glass rounded-xl border border-[hsl(var(--border))] focus:outline-none focus:border-[hsl(var(--accent))] placeholder-[hsl(var(--muted))]"
          />

          <CustomSelect
            value={stateFilter}
            onChange={setStateFilter}
            options={stateOptions}
            placeholder="All"
          />

          <CustomSelect
            value={sort}
            onChange={setSort}
            options={sortOptions}
            placeholder="Sort by"
          />

          <CustomSelect
            value={direction}
            onChange={setDirection}
            options={directionOptions}
            placeholder="Order"
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="glass p-10 rounded-2xl text-center text-red-400 border border-red-500/20">
            {error}
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-20 text-[hsl(var(--muted))] text-lg">
            No issues found with current filters
          </div>
        ) : (
          <div className="grid gap-6 md:gap-7">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}

        {totalCount > perPage && !loading && (
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalItems={totalCount}
            perPage={perPage}
          />
        )}
      </main>
    </div>
  );
}
