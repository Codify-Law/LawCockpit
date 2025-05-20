"use client";

import { FileText } from "lucide-react";
import LoadingState from "@/components/loading-state";
import useDocument from "@/hooks/useDocument";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function DocumentDetailPage() {
  const { variables, methods } = useDocument();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Update Document
      </div>
      {variables.isLoading ? (
        <div className="w-full pt-32">
          <LoadingState />
        </div>
      ) : !variables.documentData ? null : (
        <div className="flex flex-col items-start justify-start w-full p-8">
          <div className="flex items-start justify-end w-full mb-7 gap-2">
            <Link
              className="flex items-center justify-center h-11 cursor-pointer font-semibold px-5 bg-black text-white rounded-md"
              href={`/dashboard/documents/${variables.documentData.id}`}
            >
              Back to Document
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
            <div className="space-y-4">
              {/* Document title */}
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm text-gray-500 mb-1">Document Title</p>
                <h2 className="text-lg font-semibold mb-6">
                  {variables.documentData.title}
                </h2>
              </div>
              <form
                className="grid grid-cols-2 gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  methods.updateDocumentMutation();
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter document title"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="h-[42px] bg-white text-base"
                    {...variables.form.register("title")}
                  />
                  {variables.form.formState.errors.title && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.title.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="title">Document Type</Label>
                  <Select
                    onValueChange={(value: "treaty" | "judgement") =>
                      variables.form.setValue("document_type", value)
                    }
                    defaultValue={variables.form.watch("document_type")}
                  >
                    <SelectTrigger className="w-full h-10 focus:ring-2 focus:ring-blue-500 bg-white">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treaty">Treaty</SelectItem>
                      <SelectItem value="judgement">Judgement</SelectItem>
                    </SelectContent>
                  </Select>
                  {variables.form.formState.errors.title && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.title.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="conclusion_info">
                    Conclusion Information
                  </Label>
                  <Input
                    id="conclusion_info"
                    placeholder="Enter conclusion details"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="h-[42px] bg-white text-base"
                    {...variables.form.register("conclusion_info")}
                  />
                  {variables.form.formState.errors.conclusion_info && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.conclusion_info.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="eif_info">EIF Information</Label>
                  <Input
                    id="eif_info"
                    placeholder="Enter EIF details"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="h-[42px] bg-white text-base"
                    {...variables.form.register("eif_info")}
                  />
                  {variables.form.formState.errors.eif_info && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.eif_info.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="attachment_info">
                    Attachment Information
                  </Label>
                  <Input
                    id="attachment_info"
                    placeholder="Enter attachment details"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="h-[42px] bg-white text-base"
                    {...variables.form.register("attachment_info")}
                  />
                  {variables.form.formState.errors.attachment_info && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.attachment_info.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Select
                    disabled={variables.isLoadingCategories}
                    onValueChange={(value) =>
                      variables.form.setValue("category_id", value)
                    }
                    defaultValue={variables.documentData.category.id}
                    value={variables.form.watch("category_id")}
                  >
                    <SelectTrigger className="w-full h-10 focus:ring-2 focus:ring-blue-500 bg-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {variables.categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {variables.form.formState.errors.category_id && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.category_id.message}
                    </span>
                  )}
                </div>
                <div className="col-span-2 gap-4 flex">
                  <Button
                    type="submit"
                    variant={"default"}
                    className="cursor-pointer"
                    disabled={variables.isUpdating || variables.isLoading}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => variables.form.reset()}
                    className="cursor-pointer"
                    disabled={variables.isUpdating || variables.isLoading}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
