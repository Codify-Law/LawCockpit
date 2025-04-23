import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookUser, LucideEye } from "lucide-react";

interface DemoRequest {
  name: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedDate: string;
  email: string;
}

const demoRequests: DemoRequest[] = [
  {
    name: "Sam",
    status: "Pending",
    requestedDate: "5 April 2025",
    email: "sam@codifylaw.ai",
  },
  {
    name: "John Smith",
    status: "Approved",
    requestedDate: "6 April 2025",
    email: "john@codifylaw.ai",
  },
  {
    name: "Emma Wilson",
    status: "Rejected",
    requestedDate: "7 April 2025",
    email: "emma@codifylaw.ai",
  },
  {
    name: "Michael Brown",
    status: "Pending",
    requestedDate: "8 April 2025",
    email: "michael@codifylaw.ai",
  },
  {
    name: "Sarah Johnson",
    status: "Approved",
    requestedDate: "9 April 2025",
    email: "sarah@codifylaw.ai",
  },
  {
    name: "David Lee",
    status: "Pending",
    requestedDate: "10 April 2025",
    email: "david@codifylaw.ai",
  },
  {
    name: "Lisa Anderson",
    status: "Rejected",
    requestedDate: "11 April 2025",
    email: "lisa@codifylaw.ai",
  },
  {
    name: "James Wilson",
    status: "Approved",
    requestedDate: "12 April 2025",
    email: "james@codifylaw.ai",
  },
];

export default function DemoRequestsPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <BookUser />
        Demo Requests
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm w-26 text-center block ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>{request.requestedDate}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer hover:bg-gray-200"
                    >
                      <LucideEye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
