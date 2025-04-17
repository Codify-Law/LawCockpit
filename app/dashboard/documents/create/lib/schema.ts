import { z } from "zod";

export const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  document_type: z.enum(["treaty", "judgement"], {
    required_error: "Document type must be treaty or judgement",
  }),
  agreement_type: z.string().min(1, "Agreement type is required"),
  conclusion_info: z.string().min(1, "Conclusion info is required"),
  eif_info: z.string().min(1, "EIF info is required"),
  attachment_info: z.string().min(1, "Attachment info is required"),
  authentic_texts: z.string().min(1, "Authentic texts are required"),
  subject_terms: z.string().min(1, "Subject terms are required"),
  category_id: z.string().min(1, "Category is required"),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
