import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function IssueDetail() {
  const { number } = useParams();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issueRes = await fetch(
          `https://api.github.com/repos/facebook/react/issues/${number}`
        );
        if (!issueRes.ok)
          throw new Error(
            issueRes.status === 404
              ? "Issue not found (404)"
              : `GitHub API error: ${issueRes.status}`
          );
        const issueData = await issueRes.json();
        setIssue(issueData);

        if (issueData.comments > 0) {
          const commentsRes = await fetch(issueData.comments_url);
          if (commentsRes.ok) {
            setComments(await commentsRes.json());
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [number]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-muted animate-pulse flex flex-row space-x-2">
          <span>Loading issue #{number}</span>
          <Loader size={24} className="animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-danger mb-3">
            Error loading issue
          </h2>
          <p className="text-muted mb-6">{error}</p>
          <Link
            to="/issues"
            className="
              inline-block px-6 py-3 bg-danger hover:bg-danger/90
              text-white font-medium rounded-xl transition-all
            "
          >
            ← Back to issues
          </Link>
        </div>
      </div>
    );
  }

  if (!issue) return null;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-16">
        {/* Back button */}
        <Link
          to="/issues"
          className="
            inline-flex items-center gap-2 text-blue-600 hover:text-primaryHover
            text-lg font-medium mb-10 transition-colors
          "
        >
          <ArrowLeft size={20} />
          Back to issues
        </Link>

        {/* Main issue card */}
        <article
          className="
            glass rounded-2xl overflow-x-auto
            border border-border/70
          "
        >
          {/* Header */}
          <div
            className="
              p-6 md:p-9 border-b border-border/60
              bg-surface/80 backdrop-blur-md
            "
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                #{issue.number} {issue.title}
              </h1>
              <span
                className={`
                  inline-flex px-5 py-2 rounded-full text-sm font-semibold
                  ${
                    issue.state === "open"
                      ? "bg-success/15 text-success border border-success/30"
                      : "bg-accent/15 text-accent border border-accent/30"
                  }
                `}
              >
                {issue.state.toUpperCase()}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
              <div>
                Opened by{" "}
                <span className="font-semibold text-foreground/90">
                  {issue.user.login}
                </span>
              </div>
              <div>
                {formatDistanceToNow(new Date(issue.created_at), {
                  addSuffix: true,
                })}
              </div>
              <div>{issue.comments} comments</div>
            </div>
          </div>

          {/* Issue Body - using dangerouslySetInnerHTML */}
          <div className="p-6 md:p-9 prose prose-slate max-w-none">
            <div
              className="text-foreground/95 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  issue.body_html ||
                  issue.body ||
                  "<em>No description provided.</em>",
              }}
            />
          </div>
        </article>

        {/* Comments */}
        {comments.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Comments ({comments.length})
            </h2>

            <div className="space-y-8">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="
                    glass rounded-2xl overflow-x-auto
                    border border-border/70
                  "
                >
                  {/* Comment header */}
                  <div
                    className="
                      flex items-center gap-4 p-6 border-b border-border/60
                      bg-surface/80 backdrop-blur-md
                    "
                  >
                    <img
                      src={comment.user.avatar_url}
                      alt={comment.user.login}
                      className="w-12 h-12 rounded-full ring-1 ring-border/50"
                    />
                    <div>
                      <div className="font-semibold text-foreground">
                        {comment.user.login}
                      </div>
                      <div className="text-sm text-muted">
                        {formatDistanceToNow(new Date(comment.created_at), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Comment Body - using dangerouslySetInnerHTML */}
                  <div className="p-6 md:p-8 prose prose-slate max-w-none">
                    <div
                      className="text-foreground/95 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html:
                          comment.body_html ||
                          comment.body ||
                          "<em>No content</em>",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
