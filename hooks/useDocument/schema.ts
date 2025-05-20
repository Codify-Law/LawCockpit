import { z } from "zod";

export const documentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(1000, "Title cannot exceed 1000 characters"),
  category_id: z
    .string()
    .min(1, "Category is required")
    .max(255, "Category ID cannot exceed 255 characters"),
  document_type: z.enum(["treaty", "judgement"], {
    errorMap: () => ({
      message: "Document type must be either treaty or judgement",
    }),
  }),
  conclusion_info: z
    .string()
    .min(1, "Conclusion information is required")
    .max(1000, "Conclusion information cannot exceed 1000 characters"),
  eif_info: z
    .string()
    .min(1, "EIF information is required")
    .max(1000, "EIF information cannot exceed 1000 characters"),
  attachment_info: z
    .string()
    .max(1000, "Attachment information cannot exceed 1000 characters"),
  authentic_texts: z
    .array(
      z
        .string()
        .min(1, "Authentic text is required")
        .max(255, "Authentic text cannot exceed 255 characters")
    )
    .min(1, "At least one authentic text is required"),
  subject_terms: z
    .array(
      z
        .string()
        .min(1, "Subject term is required")
        .max(255, "Subject term cannot exceed 255 characters")
    )
    .min(1, "At least one subject term is required"),
  agreement_type: z
    .string()
    .min(1, "Agreement type is required")
    .max(255, "Agreement type cannot exceed 255 characters"),
});

export type UpdateDocumentPayload = z.infer<typeof documentSchema>;
