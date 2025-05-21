"use client";

import { BookMarked, Boxes, FileText, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useDocument from "@/hooks/useDocument";
import LoadingState from "@/components/loading-state";
import VectorizeDocumentModal from "./lib/components/vectorize-document-modal";
import Link from "next/link";
import Pagination from "@/components/pagination";

export default function DocumentDetailPage() {
  const { variables, set, methods } = useDocument();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Document Details
      </div>

      {variables.isLoading ? (
        <div className="w-full py-32">
          <LoadingState text="Loading Document..." />
        </div>
      ) : !variables.documentData ? null : (
        <div className="flex flex-col items-start justify-start w-full p-8 gap-8">
          <div className="flex items-start justify-end w-full gap-2">
            <VectorizeDocumentModal />
            <Link
              className="flex items-center justify-center h-11 cursor-pointer font-semibold px-5 bg-black text-white rounded-md"
              href={`${variables.documentData.id}/edit`}
            >
              Edit
            </Link>
            {/* <AddParticipantDialog /> */}
          </div>

          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
            {/* Document Participants */}
            <p className="font-semibold text-lg flex items-center justify-start gap-2 mb-4">
              <div className="p-2 bg-white border border-gray-200 rounded-md">
                <BookMarked className="size-5" />
              </div>
              Information
            </p>
            <div className="space-y-4">
              {/* Document title */}
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm text-gray-500 mb-1">Document Title</p>
                <h2 className="text-lg font-semibold mb-6">
                  {variables.documentData.title}
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
                      variables.documentData.vector_creation_status.toLowerCase() ===
                      "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {variables.documentData.vector_creation_status}
                  </span>
                </div>
                {/* Date Added */}
                <div>
                  <p className="text-sm text-gray-500">Date Added</p>
                  <p className="mt-1">
                    {new Date(
                      variables.documentData.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
                {/* Date Updated */}
                <div>
                  <p className="text-sm text-gray-500">Date Updated</p>
                  <p className="mt-1">
                    {new Date(
                      variables.documentData.updated_at
                    ).toLocaleDateString()}
                  </p>
                </div>
                {/* Document File */}
                <div>
                  <p className="text-sm text-gray-500">Document File</p>
                  <p className="mt-1">{variables.documentData.document_file}</p>
                </div>
                {/* Number of Sections */}
                <div>
                  <p className="text-sm text-gray-500">Number of Sections</p>
                  <p className="mt-1">{variables.documentData.num_sections}</p>
                </div>
                {/* Number of Pages */}
                <div>
                  <p className="text-sm text-gray-500">Number of Pages</p>
                  <p className="mt-1">{variables.documentData.num_pages}</p>
                </div>
                {/* Doc Type */}
                <div>
                  <p className="text-sm text-gray-500">Document Type</p>
                  <p className="mt-1 capitalize">
                    {variables.documentData.document_type.toLowerCase()}
                  </p>
                </div>
                {/* Conclusion Info */}
                <div>
                  <p className="text-sm text-gray-500">Conclusion Info</p>
                  <p className="mt-1">
                    {variables.documentData.conclusion_info}
                  </p>
                </div>
                {/* EIF Info */}
                <div>
                  <p className="text-sm text-gray-500">EIR Info</p>
                  <p className="mt-1">{variables.documentData.eif_info}</p>
                </div>
                {/* Attachment Info */}
                <div>
                  <p className="text-sm text-gray-500">Attachment Info</p>
                  <p className="mt-1">
                    {variables.documentData.attachment_info}
                  </p>
                </div>
                {/* Authentic Texts */}
                <div>
                  <p className="text-sm text-gray-500">Authentic Texts</p>
                  <div className="mt-1 flex gap-5">
                    {variables.documentData.authentic_texts.map((item) => (
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
                    {variables.documentData.subject_terms.map((item) => (
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
                  <p className="mt-1">
                    {variables.documentData.agreement_type}
                  </p>
                </div>
                {/* Document Category */}
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-1 capitalize">
                    {variables.documentData.category.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
            {/* Document Participants */}
            <p className="font-semibold text-lg flex items-center justify-start gap-2 mb-4">
              <div className="p-2 bg-white border border-gray-200 rounded-md">
                <Boxes className="size-5" />
              </div>
              Participants
            </p>
            <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-4">
              {!variables.participantsData ||
              !variables.participantsData.length ? (
                <p className="bg-neutral-200 px-4 pt-1 pb-1.5 rounded-sm">
                  No participants found
                </p>
              ) : (
                variables.participantsData.map((participant, index) => (
                  <p
                    key={index}
                    className="capitalize bg-white rounded-md px-3 border border-gray-200 py-1"
                  >
                    {participant.participant_name}
                  </p>
                ))
              )}
            </div>
          </div>

          {variables.isFetchingSections || variables.isLoadingSections ? (
            <div className="w-full py-32">
              <LoadingState text="Loading Sections..." />
            </div>
          ) : (
            <div className="flex flex-col items-start justify-start w-full">
              <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
                {/* Document Sections */}
                <p className="font-semibold text-lg flex items-center justify-start gap-2 mb-4">
                  <div className="p-2 bg-white border border-gray-200 rounded-md">
                    <Text className="size-5" />
                  </div>
                  Sections
                </p>
                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-4">
                  {!variables.sections || !variables.sections.length ? (
                    <div className="bg-neutral-200 px-4 pt-1 pb-1.5 rounded-sm">
                      No section found
                    </div>
                  ) : (
                    [...variables.sections].reverse().map((section, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-start bg-white rounded-md p-5 border border-gray-200 gap-4 w-full"
                      >
                        <div className="w-full flex items-center justify-between pb-3 border-b">
                          <h2 className="w-3/4 font-semibold">
                            {section.title}
                          </h2>
                          <div className="flex gap-2">
                            {section.id === variables.editingSectionId ? (
                              <>
                                <Button
                                  className="cursor-pointer"
                                  onClick={() => {
                                    methods.handleEditSection(null, "");
                                  }}
                                >
                                  Cancel Editing
                                </Button>
                                <Button
                                  onClick={async () => {
                                    methods.updateSectionMutation({
                                      sectionId: section.id,
                                      documentId: variables.documentData!.id,
                                      text: variables.editingSectionText,
                                    });
                                  }}
                                  className="bg-green-200 text-black cursor-pointer hover:bg-green-300 hover:text-black"
                                >
                                  Save Changes
                                </Button>
                                <Button
                                  className="cursor-pointer"
                                  onClick={() => {
                                    methods.handleEditSection(
                                      section.id,
                                      section.text
                                    );
                                  }}
                                  variant={"outline"}
                                >
                                  Reset
                                </Button>
                              </>
                            ) : (
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  methods.handleEditSection(
                                    section.id,
                                    section.text
                                  );
                                }}
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                        {variables.editingSectionId === section.id ? (
                          <Textarea
                            onChange={(e) => {
                              set.setEditingSectionText(e.target.value);
                            }}
                            value={variables.editingSectionText}
                            className="!text-base"
                            rows={10}
                          >
                            {variables.editingSectionText}
                          </Textarea>
                        ) : (
                          <div className="whitespace-pre-line w-full">
                            {section.text}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {variables.documentData?.num_sections &&
                  variables.sections &&
                  variables.sections.length > 0 && (
                    <>
                      <Pagination
                        currentPage={variables.currentSectionsPage}
                        totalSections={variables.documentData.num_sections}
                        sectionsPerPage={variables.sectionPerPage}
                      />
                    </>
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
