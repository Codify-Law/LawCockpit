"use client";

import { FileText } from "lucide-react";
import useDocument from "./lib/useDocument";
import LoadingState from "@/components/loading-state";
// import AddParticipantDialog from "@/containers/add-participant-dialog";

export default function DocumentDetailPage() {
  const { variables } = useDocument();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Document Details
      </div>
      {variables.isLoading ? (
        <div className="w-full pt-32">
          <LoadingState />
        </div>
      ) : !variables.data ? null : (
        <div className="flex flex-col items-start justify-start w-full p-8">
          {/* <div className="flex items-start justify-end w-full mb-7">
            <AddParticipantDialog />
          </div> */}

          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
            <div className="space-y-4">
              {/* Document title */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  {variables.data.title}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Vector Creation Status */}
                <div>
                  <p className="text-sm text-gray-500">
                    Vector Creation Status
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm w-26 text-center inline-block capitalize mt-1 ${
                      variables.data.vector_creation_status.toLowerCase() === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {variables.data.vector_creation_status}
                  </span>
                </div>
                {/* Date Added */}
                <div>
                  <p className="text-sm text-gray-500">Date Added</p>
                  <p className="mt-1">
                    {new Date(variables.data.created_at).toLocaleDateString()}
                  </p>
                </div>
                {/* Date Updated */}
                <div>
                  <p className="text-sm text-gray-500">Date Updated</p>
                  <p className="mt-1">
                    {new Date(variables.data.updated_at).toLocaleDateString()}
                  </p>
                </div>
                {/* Document File */}
                <div>
                  <p className="text-sm text-gray-500">Document File</p>
                  <p className="mt-1">{variables.data.document_file}</p>
                </div>
                {/* Number of Sections */}
                <div>
                  <p className="text-sm text-gray-500">Number of Sections</p>
                  <p className="mt-1">{variables.data.num_sections}</p>
                </div>
                {/* Number of Pages */}
                <div>
                  <p className="text-sm text-gray-500">Number of Pages</p>
                  <p className="mt-1">{variables.data.num_pages}</p>
                </div>
                {/* Doc Type */}
                <div>
                  <p className="text-sm text-gray-500">Document Type</p>
                  <p className="mt-1 capitalize">{variables.data.document_type.toLowerCase()}</p>
                </div>
                {/* Conclusion Info */}
                <div>
                  <p className="text-sm text-gray-500">Conclusion Info</p>
                  <p className="mt-1">{variables.data.conclusion_info}</p>
                </div>
                {/* EIF Info */}
                <div>
                  <p className="text-sm text-gray-500">EIR Info</p>
                  <p className="mt-1">{variables.data.eif_info}</p>
                </div>
                {/* Attachment Info */}
                <div>
                  <p className="text-sm text-gray-500">Attachment Info</p>
                  <p className="mt-1">{variables.data.attachment_info}</p>
                </div>
                {/* Authentic Texts */}
                <div>
                  <p className="text-sm text-gray-500">Authentic Texts</p>
                  <div className="mt-1 flex gap-5">
                    {variables.data.authentic_texts.map((item) => (
                      <span
                        key={item}
                        className="capitalize bg-white rounded-md px-3 border border-gray-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Subject Terms */}
                <div>
                  <p className="text-sm text-gray-500">Subject Terms</p>
                  <div className="mt-1 flex gap-5">
                    {variables.data.subject_terms.map((item) => (
                      <span
                        key={item}
                        className="capitalize bg-white rounded-md px-3 border border-gray-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Agreement Type */}
                <div>
                  <p className="text-sm text-gray-500">Agreement Type</p>
                  <p className="mt-1">{variables.data.agreement_type}</p>
                </div>
                {/* Document Category */}
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-1 capitalize">
                    {variables.data.category.name}
                  </p>
                </div>
                {/* Document Participants */}
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <div className="mt-1 flex gap-5">
                    {variables.participantsData?.map((participant, index) => (
                      <span
                        key={index}
                        className="capitalize bg-white rounded-md px-3 border border-gray-200"
                      >
                        {participant.participant_name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
