import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-gray-300"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-transparent border-t-gray-200 animate-spin"></div>
      </div>
      <p className="mt-4 text-blue-500 font-medium">
        <Loader size={40} />
      </p>
    </div>
  );
}
