"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookUser, LucideEye } from "lucide-react";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import Link from "next/link";
import useContactRequests from "./lib/useContactRequests";

export default function ContactRequestsPage() {
  const { variables } = useContactRequests();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <BookUser />
        Contact Requests
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
          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variables.data.data.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {request.name}
                    </TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone_number}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={"/dashboard/contact-requests/" + request.id}
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
        </div>
      )}
    </>
  );
}
