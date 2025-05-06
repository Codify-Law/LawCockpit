import LoadingState from "@/components/loading-state";
import { FileText } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Demo Requests
      </div>
      <div className="w-full pt-32">
        <LoadingState />
      </div>
    </>
  );
}
