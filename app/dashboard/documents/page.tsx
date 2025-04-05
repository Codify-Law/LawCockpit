import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, LucideEye } from "lucide-react";

interface Document {
  name: string;
  status: "not-indexed" | "indexed" | "processing" | "failed";
  dateAdded: string;
  path: string;
  category: string;
}

const documents: Document[] = [
  {
    name: "Vienna Convention on the Law of Treaties",
    status: "indexed",
    dateAdded: "12 April 2025",
    path: "/files/treaties",
    category: "treaties",
  },
  {
    name: "UN Convention on the Law of the Sea",
    status: "not-indexed",
    dateAdded: "15 April 2025",
    path: "/files/legislation",
    category: "legislation",
  },
  {
    name: "Geneva Conventions",
    status: "processing",
    dateAdded: "18 April 2025",
    path: "/files/regulations",
    category: "regulations",
  },
  {
    name: "International Criminal Court Statute",
    status: "failed",
    dateAdded: "20 April 2025",
    path: "/files/cases",
    category: "cases",
  },
  {
    name: "UN Charter",
    status: "indexed",
    dateAdded: "22 April 2025",
    path: "/files/treaties",
    category: "treaties",
  },
  {
    name: "Universal Declaration of Human Rights",
    status: "indexed",
    dateAdded: "25 April 2025",
    path: "/files/treaties",
    category: "treaties",
  },
  {
    name: "Convention on Diplomatic Relations",
    status: "processing",
    dateAdded: "27 April 2025",
    path: "/files/treaties",
    category: "treaties",
  },
  {
    name: "WTO Agreement",
    status: "not-indexed",
    dateAdded: "29 April 2025",
    path: "/files/legislation",
    category: "legislation",
  },
  {
    name: "Convention on Climate Change",
    status: "indexed",
    dateAdded: "1 May 2025",
    path: "/files/treaties",
    category: "treaties",
  },
  {
    name: "Refugee Convention",
    status: "processing",
    dateAdded: "3 May 2025",
    path: "/files/regulations",
    category: "regulations",
  },
];

export default function DocumentsPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Documents
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date added</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm w-26 text-center block capitalize ${
                        request.status === "indexed"
                          ? "bg-green-100 text-green-800"
                          : request.status === "not-indexed"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>{request.dateAdded}</TableCell>
                  <TableCell>{request.path}</TableCell>
                  <TableCell className="capitalize">
                    {request.category}
                  </TableCell>
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
