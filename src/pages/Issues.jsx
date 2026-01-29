import { useGitHubIssues } from "../hooks/useGitHubIssues";
import IssueCard from "../components/IssueCard";
import Pagination from "../components/Pagination";
import LoadingSkeleton from "../components/LoadingSkeleton";

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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.4)] bg-[hsl(var(--surface)/0.6)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-600 ">
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

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-5 py-3.5 glass rounded-xl border border-[hsl(var(--border))]"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="all">All</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-5 py-3.5 glass rounded-xl border border-[hsl(var(--border))]"
          >
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="comments">Comments</option>
          </select>

          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="px-5 py-3.5 glass rounded-xl border border-[hsl(var(--border))]"
          >
            <option value="desc">Newest ↓</option>
            <option value="asc">Oldest ↑</option>
          </select>
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
