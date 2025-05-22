"use client";

import { BookUser } from "lucide-react";
import useDemoRequest from "./_lib/useDemoRequest";
import LoadingState from "@/components/loading-state";
import { COUNTRIES } from "@/lib/constants";

export default function DemoRequestDetailPage() {
  const { variables } = useDemoRequest();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <BookUser />
        Demo Request Details
      </div>

      {variables.isLoading ? (
        <div className="w-full pt-32">
          <LoadingState />
        </div>
      ) : !variables.data ? null : (
        <div className="flex flex-col items-start justify-start w-full p-8">
          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  First Name
                </h3>
                <p className="mt-1 text-lg">{variables.data.first_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                <p className="mt-1 text-lg">{variables.data.last_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg">{variables.data.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h3>
                <p className="mt-1 text-lg">{variables.data.phone_number}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Country</h3>
                <p className="mt-1 text-lg">
                  {
                    COUNTRIES.find((i) => i.alpha3 === variables.data?.country)
                      ?.name
                  }
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p
                  className={`mt-1 text-lg capitalize ${
                    variables.data.status.toLowerCase() === "pending"
                      ? "text-yellow-600"
                      : variables.data.status.toLowerCase() === "approved"
                      ? "text-green-600"
                      : variables.data.status.toLowerCase() === "rejected"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {variables.data.status.toLowerCase()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Customer Type
                </h3>
                <p className="mt-1 text-lg">
                  {variables.data.customer_type === 0
                    ? "Individual"
                    : "Company"}
                </p>
              </div>
              {variables.data.customer_type === 1 ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Company Name
                    </h3>
                    <p className="mt-1 text-lg">
                      {variables.data.company_name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Number of Employees
                    </h3>
                    <p className="mt-1 text-lg">
                      {variables.data.num_employees}
                    </p>
                  </div>
                </>
              ) : null}

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Requested Date
                </h3>
                <p className="mt-1 text-lg">
                  {new Date(variables.data.created_at).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              {/* <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-lg">{variables.data.description}</p>
              </div> */}
            </div>
            {/* <div className="mt-6 flex justify-end gap-4">
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
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
