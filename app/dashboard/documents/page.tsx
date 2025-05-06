"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, LucideEye } from "lucide-react";
import useDocuments from "./lib/useDocuments";
import LoadingState from "@/components/loading-state";
import Link from "next/link";
import ErrorState from "@/components/error-state";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import React, { Fragment } from "react";
import { Input } from "@/components/ui/input";

export default function DocumentsPage() {
  const { variables, set } = useDocuments();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Documents
      </div>
      {variables.isLoading || variables.isFetching ? (
        <div className="w-full pt-32">
          <LoadingState />
        </div>
      ) : !variables.data || variables.isError ? (
        <div className="w-full pt-32">
          <ErrorState />
        </div>
      ) : (
        <div className="flex flex-col items-start justify-start w-full p-8">
          <Input
            className="mb-8 w-1/3"
            value={variables.keyword}
            onChange={(e) => set.setKeword(e.target.value)}
            placeholder="Search documents..."
          />

          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
            <Table>
              {variables.data.data.length < 1 && (
                <TableCaption className="pb-3 text-gray-500 text-base">
                  Unable to find any documents with the provided keyword. Please
                  try a different search term.
                </TableCaption>
              )}

              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="max-w-[300px]">Name</TableHead>
                  <TableHead className="text-center">Doc Type</TableHead>
                  <TableHead className="text-center">Date Added</TableHead>
                  <TableHead className="text-center">VC Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variables.data.data.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {doc.title}
                    </TableCell>
                    <TableCell className="capitalize text-center">
                      {doc.document_type.toLowerCase()}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm w-26 text-center block capitalize mx-auto ${
                          doc.vector_creation_status.toLowerCase() === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {doc.vector_creation_status}
                      </span>
                    </TableCell>
                    <TableCell className="capitalize">
                      {doc.category.name.toLowerCase()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={"/dashboard/documents/" + doc.id}
                        className="cursor-pointer ml-auto mr-0 flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <LucideEye className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {variables.data.data.length > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${Math.max(1, variables.current_page - 1)}`}
                    aria-disabled={variables.current_page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: variables.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (variables.totalPages <= 7) return true;
                    if (page === 1) return true;
                    if (page === variables.totalPages) return true;
                    if (
                      page >= variables.current_page - 1 &&
                      page <= variables.current_page + 1
                    )
                      return true;
                    return false;
                  })
                  .map((page, index, array) => (
                    <Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <PaginationItem>
                          <span className="px-3 py-2">...</span>
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <Link
                          href={`?page=${page}`}
                          className={cn(
                            "block px-3 py-2 rounded-md hover:bg-gray-200 transition-colors",
                            {
                              "bg-gray-200": page === variables.current_page,
                            }
                          )}
                        >
                          {page}
                        </Link>
                      </PaginationItem>
                    </Fragment>
                  ))}
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${Math.min(
                      variables.totalPages,
                      variables.current_page + 1
                    )}`}
                    aria-disabled={
                      variables.current_page === variables.totalPages
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </>
  );
}
