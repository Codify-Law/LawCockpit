"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardPlus } from "lucide-react";
import useCreateDocument from "./lib/useCreateDocument";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateDocumentPage() {
  const { variables, methods } = useCreateDocument();

  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <ClipboardPlus />
        Documents
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm">
          <form
            onSubmit={methods.handleSubmit(methods.onSubmit)}
            className="p-6 space-y-4 grid grid-cols-3 gap-6"
          >
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Title
              </Label>
              <Input
                {...methods.register("title")}
                type="text"
                className="h-[42px] bg-white text-base"
                placeholder="Enter document title"
              />
              {variables.errors.title && (
                <span className="text-red-500 text-sm">
                  {variables.errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Agreement Type
              </Label>
              <Input
                {...methods.register("agreement_type")}
                type="text"
                className="h-[42px] bg-white text-base"
                placeholder="Enter agreement type"
              />
              {variables.errors.agreement_type && (
                <span className="text-red-500 text-sm">
                  {variables.errors.agreement_type.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Document Type
              </Label>
              <Select
                onValueChange={(value: "treaty" | "judgement") =>
                  methods.setValue("document_type", value)
                }
                defaultValue={methods.watch("document_type")}
              >
                <SelectTrigger className="w-full h-10 focus:ring-2 focus:ring-blue-500 bg-white">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="treaty">Treaty</SelectItem>
                  <SelectItem value="judgement">Judgement</SelectItem>
                </SelectContent>
              </Select>
              {variables.errors.document_type && (
                <span className="text-red-500 text-sm">
                  {variables.errors.document_type.message}
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
                  methods.setValue("category_id", value)
                }
                defaultValue={methods.watch("category_id")}
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
              {variables.errors.category_id && (
                <span className="text-red-500 text-sm">
                  {variables.errors.category_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Authentic Texts
              </Label>
              <Input
                {...methods.register("authentic_texts")}
                type="text"
                className="h-[42px] bg-white text-base"
                placeholder="Enter comma separated list of authentic texts"
              />
              {variables.errors.authentic_texts && (
                <span className="text-red-500 text-sm">
                  {variables.errors.authentic_texts.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Subject Terms
              </Label>
              <Input
                {...methods.register("subject_terms")}
                type="text"
                className="h-[42px] bg-white text-base"
                placeholder="Enter comma separated list of subject terms"
              />
              {variables.errors.subject_terms && (
                <span className="text-red-500 text-sm">
                  {variables.errors.subject_terms.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Conclusion Info
              </Label>
              <Textarea
                {...methods.register("conclusion_info")}
                rows={4}
                className="bg-white text-base resize-none"
                placeholder="Enter conclusion information"
              />
              {variables.errors.conclusion_info && (
                <span className="text-red-500 text-sm">
                  {variables.errors.conclusion_info.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                EIF Info
              </Label>
              <Textarea
                {...methods.register("eif_info")}
                rows={4}
                className="bg-white text-base resize-none"
                placeholder="Enter EIF information"
              />
              {variables.errors.eif_info && (
                <span className="text-red-500 text-sm">
                  {variables.errors.eif_info.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="block text-sm font-medium text-gray-700">
                Attachment Info
              </Label>
              <Textarea
                {...methods.register("attachment_info")}
                rows={4}
                className="bg-white text-base resize-none"
                placeholder="Enter attachment information"
              />
              {variables.errors.attachment_info && (
                <span className="text-red-500 text-sm">
                  {variables.errors.attachment_info.message}
                </span>
              )}
            </div>
            <div>
              <Button
                variant={"default"}
                type="submit"
                className="cursor-pointer"
              >
                Create Document
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
