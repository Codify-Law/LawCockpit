import { LoaderCircle } from "lucide-react";

export default function LoadingState({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="w-full flex items-center justify-center font-bold gap-4">
      <LoaderCircle
        className="size-10 text-cyan-500 animate-spin"
        strokeWidth="3.5"
      />
      {text}
    </div>
  );
}
