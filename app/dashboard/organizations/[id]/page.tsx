import { Building2, Mail, MapPin, Phone } from "lucide-react";

interface OrganizationDetails {
  name: string;
  status: "active" | "inactive" | "pending";
  dateAdded: string;
  location: string;
  type: string;
  email: string;
  phone: string;
  description: string;
  contactPerson: string;
}

const organizationDetails: OrganizationDetails = {
  name: "United Nations",
  status: "active",
  dateAdded: "12 April 2025",
  location: "New York, USA",
  type: "international",
  email: "contact@un.org",
  phone: "+1 212-963-1234",
  description:
    "The United Nations is an intergovernmental organization that aims to maintain international peace and security, develop friendly relations among nations, achieve international cooperation, and be a center for harmonizing the actions of nations.",
  contactPerson: "António Guterres",
};

export default function OrganizationDetailsPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <Building2 />
        Organization Details
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-white border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">
              {organizationDetails.name}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm capitalize ${
                organizationDetails.status === "active"
                  ? "bg-green-100 text-green-800"
                  : organizationDetails.status === "inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {organizationDetails.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm text-gray-500">Type</h2>
                <p className="capitalize">{organizationDetails.type}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Date Added</h2>
                <p>{organizationDetails.dateAdded}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Contact Person</h2>
                <p>{organizationDetails.contactPerson}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <p>{organizationDetails.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <p>{organizationDetails.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <p>{organizationDetails.phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm text-gray-500 mb-2">Description</h2>
            <p className="text-gray-700">{organizationDetails.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
