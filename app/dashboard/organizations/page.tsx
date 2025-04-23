import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, LucideEye } from "lucide-react";

interface Organization {
  name: string;
  status: "active" | "inactive" | "pending";
  dateAdded: string;
  location: string;
  type: string;
}

const organizations: Organization[] = [
  {
    name: "United Nations",
    status: "active",
    dateAdded: "12 April 2025",
    location: "New York, USA",
    type: "international",
  },
  {
    name: "World Trade Organization",
    status: "active",
    dateAdded: "15 April 2025",
    location: "Geneva, Switzerland",
    type: "international",
  },
  {
    name: "European Union",
    status: "active",
    dateAdded: "18 April 2025",
    location: "Brussels, Belgium",
    type: "regional",
  },
  {
    name: "African Union",
    status: "pending",
    dateAdded: "20 April 2025",
    location: "Addis Ababa, Ethiopia",
    type: "regional",
  },
  {
    name: "ASEAN",
    status: "active",
    dateAdded: "22 April 2025",
    location: "Jakarta, Indonesia",
    type: "regional",
  },
  {
    name: "International Court of Justice",
    status: "active",
    dateAdded: "25 April 2025",
    location: "The Hague, Netherlands",
    type: "judicial",
  },
  {
    name: "World Health Organization",
    status: "active",
    dateAdded: "27 April 2025",
    location: "Geneva, Switzerland",
    type: "international",
  },
  {
    name: "International Labor Organization",
    status: "inactive",
    dateAdded: "29 April 2025",
    location: "Geneva, Switzerland",
    type: "international",
  },
  {
    name: "UNICEF",
    status: "active",
    dateAdded: "1 May 2025",
    location: "New York, USA",
    type: "international",
  },
  {
    name: "World Bank",
    status: "active",
    dateAdded: "3 May 2025",
    location: "Washington DC, USA",
    type: "financial",
  },
];

export default function OrganizationsPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <Building2 />
        Organizations
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date added</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((organization, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {organization.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm w-26 text-center block capitalize ${
                        organization.status === "active"
                          ? "bg-green-100 text-green-800"
                          : organization.status === "inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {organization.status}
                    </span>
                  </TableCell>
                  <TableCell>{organization.dateAdded}</TableCell>
                  <TableCell>{organization.location}</TableCell>
                  <TableCell className="capitalize">
                    {organization.type}
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
