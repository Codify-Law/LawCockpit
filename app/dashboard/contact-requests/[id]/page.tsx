"use client";

import { BookUser } from "lucide-react";

import LoadingState from "@/components/loading-state";
import useContactRequest from "./_lib/useDemoRequest";

export default function ContactRequestDetailPage() {
  const { variables } = useContactRequest();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <BookUser />
        Contact Request Details
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
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-lg">{variables.data.name}</p>
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
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 text-lg">{variables.data.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
