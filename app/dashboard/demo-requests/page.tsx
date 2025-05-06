'use client'

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookUser, LucideEye } from "lucide-react";
import useDemoRequests from "./lib/useDocuments";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

export default function DemoRequestsPage() {
  const { variables } = useDemoRequests();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <BookUser />
        Demo Requests
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
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-center">Country</TableHead>
                  <TableHead className="text-center">Customer Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variables.data.data.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {request.first_name} {request.last_name}
                    </TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone_number}</TableCell>
                    <TableCell className="text-center">{request.country}</TableCell>
                    <TableCell className="text-center">
                      {request.customer_type === 0 ? "Individual" : "Company"}
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
      )}
    </>
  );
}
