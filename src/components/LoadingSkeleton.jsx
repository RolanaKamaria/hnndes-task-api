export default function LoadingSkeleton() {
  return (
    <div className="space-y-5 md:space-y-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="
            glass rounded-xl p-5 sm:p-6 animate-pulse
            border border-border/60
          "
        >
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-8 h-8 bg-muted/30 rounded-full " />
            <div className="flex-1 space-y-3.5">
              <div className="h-6 bg-muted/25 rounded w-5/6" />
              <div className="h-4 bg-muted/20 rounded w-3/5" />
              <div className="flex gap-3 pt-1">
                <div className="h-5 w-16 bg-muted/20 rounded" />
                <div className="h-5 w-20 bg-muted/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
