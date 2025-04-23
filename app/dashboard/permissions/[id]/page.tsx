import { Button } from "@/components/ui/button";
import { Shield, LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Resource {
  id: string;
  name: string;
  operations: {
    id: string;
    name: string;
    selected: boolean;
  }[];
}

interface ACLPermission {
  name: string;
  description: string;
  updatedAt: string;
  resources: Resource[];
}

const permission: ACLPermission = {
  name: "Super Admin",
  description: "Full system access with all privileges",
  updatedAt: "2023-01-15",
  resources: [
    {
      id: "1",
      name: "Users",
      operations: [
        { id: "1", name: "Create", selected: true },
        { id: "2", name: "Read", selected: true },
        { id: "3", name: "Update", selected: true },
        { id: "4", name: "Delete", selected: true },
      ],
    },
    {
      id: "2",
      name: "Roles",
      operations: [
        { id: "5", name: "Create", selected: true },
        { id: "6", name: "Read", selected: true },
        { id: "7", name: "Update", selected: true },
        { id: "8", name: "Delete", selected: true },
      ],
    },
  ],
};

export default function PermissionDetailPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <Shield />
        Permission Details
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <Link href="/dashboard/permissions" className="mb-6">
          <Button variant="ghost" className="gap-2">
            <LucideArrowLeft className="h-4 w-4" />
            Back to Permissions
          </Button>
        </Link>
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <Input className="mt-1 bg-white" value={permission.name} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <Textarea
                className="mt-1 bg-white"
                value={permission.description}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Resources and Operations
              </h3>
              <div className="space-y-6">
                {permission.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="border border-gray-200 rounded-md p-4 bg-white"
                  >
                    <h4 className="font-medium mb-3">{resource.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {resource.operations.map((operation) => (
                        <div
                          key={operation.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={operation.id}
                            checked={operation.selected}
                          />
                          <label htmlFor={operation.id} className="text-sm">
                            {operation.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
