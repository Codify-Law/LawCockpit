import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, LucideEye } from "lucide-react";

interface ACLPermission {
  name: string;
  resources: number;
  users: number;
  description: string;
  updatedAt: string;
}

const permissions: ACLPermission[] = [
  {
    name: "Super Admin",
    resources: 7,
    users: 28,
    description: "Full system access with all privileges",
    updatedAt: "2023-01-15",
  },
  {
    name: "Content Manager",
    resources: 4,
    users: 15,
    description: "Manage content and documents",
    updatedAt: "2023-02-20",
  },
  {
    name: "User Manager",
    resources: 3,
    users: 8,
    description: "Manage user accounts and roles",
    updatedAt: "2023-03-10",
  },
  {
    name: "Viewer",
    resources: 2,
    users: 45,
    description: "Read-only access to content",
    updatedAt: "2023-04-05",
  },
];

export default function PermissionsPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <Shield />
        Access Control List
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Resource</TableHead>
                <TableHead className="text-center">Users</TableHead>
                <TableHead className="text-center">Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {permission.name}
                  </TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell className="text-center">
                    {permission.resources}
                  </TableCell>
                  <TableCell className="text-center">
                    {permission.users}
                  </TableCell>
                  <TableCell className="text-center">
                    {permission.updatedAt}
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
