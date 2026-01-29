import { AlertCircle, CheckCircle2, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export default function IssueCard({ issue }) {
  const isOpen = issue.state === "open";

  return (
    <Link
      to={`/issue/${issue.number}`}
      className={`
        group block
        w-full max-w-full
        rounded-xl sm:rounded-2xl
        p-4 xs:p-5 sm:p-6
        glass
        border border-[hsl(var(--border)/0.7)]
        hover:shadow-glass-sm sm:hover:shadow-glass
        hover:scale-[1.01] sm:hover:scale-[1.015]
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500/40 focus-visible:ring-offset-2
        overflow-hidden
      `}
    >
      <div className="flex items-start gap-3 xs:gap-4 sm:gap-5 w-full">
        {/* Status Icon */}
        <div className="mt-1 flex-shrink-0">
          {isOpen ? (
            <AlertCircle className="text-red-600" size={22} strokeWidth={2.5} />
          ) : (
            <CheckCircle2
              className="text-purple-500"
              size={22}
              strokeWidth={2.5}
            />
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          {/* Title */}
          <h3
            className={`
              text-[15px] xs:text-base sm:text-lg md:text-xl
              font-semibold
              text-[hsl(var(--foreground))]
              group-hover:text-[hsl(var(--primary))]
              transition-colors
              line-clamp-2
              mb-2 sm:mb-2.5
            `}
          >
            {issue.title}
          </h3>

          {/* Labels */}
          {issue.labels?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 max-w-full overflow-hidden">
              {issue.labels.map((label) => (
                <span
                  key={label.id}
                  className={`
                    inline-flex items-center px-2.5 py-1
                    text-[10px] xs:text-xs font-medium rounded-full
                    whitespace-nowrap flex-shrink-0
                  `}
                  style={{
                    backgroundColor: `#${label.color}1a`,
                    color: `#${label.color}`,
                    border: `1px solid #${label.color}4d`,
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-x-3 xs:gap-x-4 gap-y-1 text-[11px] xs:text-xs sm:text-sm text-[hsl(var(--muted-foreground))] overflow-hidden">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <MessageSquare size={13} className="opacity-80" />
              {issue.comments}
            </span>

            <span className="hidden xs:inline">•</span>

            <span className="whitespace-nowrap">
              opened{" "}
              {formatDistanceToNow(new Date(issue.created_at), {
                addSuffix: true,
              })}
            </span>

            <span className="hidden xs:inline">•</span>

            <span className="truncate max-w-[110px] xs:max-w-[140px] sm:max-w-[180px] md:max-w-none">
              by{" "}
              <span className="font-medium text-[hsl(var(--foreground)/0.9)]">
                {issue.user.login}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
