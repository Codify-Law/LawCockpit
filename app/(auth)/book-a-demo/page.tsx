"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useBookADemo, { FAQ_ITEMS } from "./lib/useBookADemo";

export default function Page() {
  const { variables, methods } = useBookADemo();

  return (
    <>
      <div className="relative min-h-[calc(100dvh-76px-200px)] w-full flex items-center justify-center py-10">
        <span className="bg-[url('/images/globe.png')] bg-bottom bg-cover bg-no-repeat absolute w-full h-full inset-0 opacity-30"></span>
        <div className="flex flex-col items-start justify-start bg-white p-5 rounded-2xl shadow-[0px_1px_3px_0px_#0000001A,0px_1px_2px_-1px_#0000001A] w-[560px] relative">
          <h1 className="font-EB-Garamond text-black font-bold text-[32px]">
            Request a Demo
          </h1>
          <p className="text-zinc-500 leading-[23px] font-medium mt-1">
            Fill out this form to schedule a personalized demo of our product.
          </p>

          <form
            onSubmit={variables.form.handleSubmit(methods.onSubmit)}
            className="grid grid-cols-2 gap-y-6 gap-x-3 mt-6 w-full"
          >
            <div className="flex flex-col items-start justify-start gap-2 col-span-2">
              <Label className="text-[#09090B] font-medium text-base">
                Type
              </Label>
              <RadioGroup
                defaultValue="individual"
                className="flex items-center justify-start gap-6 flex-row"
                onValueChange={(value) =>
                  variables.form.setValue(
                    "type",
                    value as "individual" | "organization"
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="individual"
                    id="individual"
                    className="border-[#18181B] transition-colors hover:border-blue-500"
                  />
                  <Label htmlFor="individual" className="cursor-pointer">
                    Individual
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="organization"
                    id="organization"
                    className="border-[#18181B] transition-colors hover:border-blue-500"
                  />
                  <Label htmlFor="organization" className="cursor-pointer">
                    Organization
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {variables.formType === "organization" && (
              <div className="grid grid-cols-1 gap-2 col-span-2 border-l border-zinc-400 pl-6 w-full">
                <div className="flex items-start justify-start flex-col gap-2">
                  <Label
                    htmlFor="companyName"
                    className="text-[#09090B] font-medium text-base"
                  >
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    {...variables.form.register("companyName")}
                    placeholder="Enter your company name"
                    className="h-[38px] focus:ring-2 focus:ring-blue-500"
                  />
                  {variables.form.formState.errors.companyName && (
                    <span className="text-red-500 text-sm">
                      {variables.form.formState.errors.companyName.message}
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-start flex-col gap-2">
                  <Label
                    htmlFor="numberOfEmployees"
                    className="text-[#09090B] font-medium text-base"
                  >
                    Number of Employees *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      variables.form.setValue("numberOfEmployees", value)
                    }
                    defaultValue={variables.form.watch("numberOfEmployees")}
                  >
                    <SelectTrigger className="w-full h-10 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select employee range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="501+">501+</SelectItem>
                    </SelectContent>
                  </Select>
                  {variables.form.formState.errors.numberOfEmployees && (
                    <span className="text-red-500 text-sm">
                      {
                        variables.form.formState.errors.numberOfEmployees
                          .message
                      }
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-start justify-start flex-col gap-2">
              <Label
                htmlFor="firstName"
                className="text-[#09090B] font-medium text-base"
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                {...variables.form.register("firstName")}
                placeholder="Enter your first name"
                className="h-[38px] focus:ring-2 focus:ring-blue-500"
              />
              {variables.form.formState.errors.firstName && (
                <span className="text-red-500 text-sm">
                  {variables.form.formState.errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <Label
                htmlFor="lastName"
                className="text-[#09090B] font-medium text-base"
              >
                Last Name *
              </Label>
              <Input
                id="lastName"
                {...variables.form.register("lastName")}
                placeholder="Enter your last name"
                className="h-[38px] focus:ring-2 focus:ring-blue-500"
              />
              {variables.form.formState.errors.lastName && (
                <span className="text-red-500 text-sm">
                  {variables.form.formState.errors.lastName.message}
                </span>
              )}
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-[#09090B] font-medium text-base"
              >
                Email *
              </Label>
              <Input
                id="email"
                {...variables.form.register("email")}
                type="email"
                placeholder="example@domain.com"
                className="h-[38px] focus:ring-2 focus:ring-blue-500"
              />
              {variables.form.formState.errors.email && (
                <span className="text-red-500 text-sm">
                  {variables.form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <Label
                htmlFor="phone"
                className="text-[#09090B] font-medium text-base"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                {...variables.form.register("phone")}
                type="tel"
                placeholder="+1 (234) 567-8900"
                className="h-[38px] focus:ring-2 focus:ring-blue-500"
              />
              {variables.form.formState.errors.phone && (
                <span className="text-red-500 text-sm">
                  {variables.form.formState.errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex items-start justify-start flex-col gap-2 col-span-2">
              <Label
                htmlFor="country"
                className="text-[#09090B] font-medium text-base"
              >
                Country / Region *
              </Label>
              <Select
                onValueChange={(value) =>
                  variables.form.setValue("country", value)
                }
                defaultValue={variables.form.watch("country")}
              >
                <SelectTrigger className="w-full h-10 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Your country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {variables.countries}
                </SelectContent>
              </Select>
              {variables.form.formState.errors.country && (
                <span className="text-red-500 text-sm">
                  {variables.form.formState.errors.country.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="bg-zinc-500 h-11 flex items-center justify-center text-white cursor-pointer col-span-2 font-medium hover:bg-zinc-600 transition-colors"
              disabled={variables.form.formState.isSubmitting}
            >
              {variables.form.formState.isSubmitting
                ? "Submitting..."
                : "Request Demo"}
            </Button>
          </form>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center justify-start w-[800px] mx-auto py-12">
          <h2 className="text-center font-bold text-2xl font-EB-Garamond">
            Frequently Asked Questions
          </h2>
          {FAQ_ITEMS.map((item) => (
            <Accordion
              key={item.id}
              type="single"
              collapsible
              className="w-full border-b text-[#18181B]"
            >
              <AccordionItem value={item.id}>
                <AccordionTrigger className="text-base font-medium cursor-pointer hover:text-blue-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
