import { useState, useEffect } from "react";

const REPO = "facebook/react";
const PER_PAGE = 12;

export function useGitHubIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [sort, setSort] = useState("");
  const [direction, setDirection] = useState("");

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.github.com/repos/${REPO}/issues?per_page=${PER_PAGE}&page=${page}&state=${stateFilter}&sort=${sort}&direction=${direction}`;

      if (searchTerm.trim()) {
        url = `https://api.github.com/search/issues?q=${encodeURIComponent(
          `${searchTerm} repo:${REPO} state:${stateFilter}`,
        )}&per_page=${PER_PAGE}&page=${page}&sort=${sort}&order=${direction}`;
      }

      const res = await fetch(url, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!res.ok) throw new Error(`GitHub API: ${res.status}`);

      const data = await res.json();

      setIssues(searchTerm.trim() ? data.items : data);
      setTotalCount(searchTerm.trim() ? data.total_count : 300);
    } catch (err) {
      setError(err.message);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [page, searchTerm, stateFilter, sort, direction]);

  return {
    issues,
    loading,
    error,
    page,
    setPage,
    totalCount,
    perPage: PER_PAGE,
    searchTerm,
    setSearchTerm,
    stateFilter,
    setStateFilter,
    sort,
    setSort,
    direction,
    setDirection,
  };
}
