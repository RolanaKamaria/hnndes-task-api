export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  stateFilter,
  setStateFilter,
}) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        type="search"
        placeholder="Search issues..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="flex-1 px-4 py-2 border border-gh-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={stateFilter}
        onChange={(e) => setStateFilter(e.target.value)}
        className="px-4 py-2 border border-gh-border rounded-md bg-white"
      >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="all">All</option>
      </select>
    </div>
  );
}
