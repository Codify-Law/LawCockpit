import { z } from "zod";

export const formSchema = z
  .object({
    type: z.enum(["individual", "organization"]),
    companyName: z
      .string()
      .max(100, "Company name cannot exceed 100 characters")
      .optional(),
    numberOfEmployees: z.string().optional(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    country: z.string().min(1, "Please select your country"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "organization") {
      // Check companyName is provided when type is organization
      if (!data.companyName || data.companyName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter your company name (minimum 2 characters)",
          path: ["companyName"],
        });
      }

      // Check numberOfEmployees is provided when type is organization
      if (!data.numberOfEmployees) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Please specify the number of employees in your organization",
          path: ["numberOfEmployees"],
        });
      }
    }
  });

export type FormValues = z.infer<typeof formSchema>;
