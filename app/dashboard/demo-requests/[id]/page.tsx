import { Button } from "@/components/ui/button";
import { BookUser } from "lucide-react";

interface DemoRequest {
  name: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedDate: string;
  email: string;
}

const demoRequest: DemoRequest = {
  name: "Sam",
  status: "Pending",
  requestedDate: "5 April 2025",
  email: "sam@codylex.com",
};

export default function DemoRequestDetailPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <BookUser />
        Demo Request Details
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-lg">{demoRequest.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <span
                className={`px-2 py-1 rounded-full text-sm w-26 text-center inline-block mt-1 ${
                  demoRequest.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : demoRequest.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {demoRequest.status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Requested Date
              </h3>
              <p className="mt-1 text-lg">{demoRequest.requestedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg">{demoRequest.email}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
            >
              Reject
            </Button>
            <Button
              variant="outline"
              className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
            >
              Approve
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
