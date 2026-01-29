import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message }) {
  return (
    <div
      className="
      glass rounded-2xl p-8 text-center border border-danger/30
      bg-danger/5  max-w-2xl mx-auto
    "
    >
      <AlertTriangle
        className="mx-auto text-danger mb-4"
        size={40}
        strokeWidth={1.8}
      />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Something went wrong
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        {message || "Couldn't load issues. Please try again later."}
      </p>
    </div>
  );
}
