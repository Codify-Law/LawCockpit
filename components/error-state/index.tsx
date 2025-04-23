import { AlertCircle } from "lucide-react";

export default function ErrorState() {
  return (
    <div className="w-full flex items-center justify-center font-bold gap-4">
      <AlertCircle className="size-10 text-red-500" strokeWidth="3.5" />
      Something went wrong
    </div>
  );
}
