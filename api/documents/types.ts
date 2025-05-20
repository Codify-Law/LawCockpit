export type AddParticipantToDocumentPayload = {
  participant_name: string;
  action: string;
  depositary: string;
  file_path: string;
  title: string;
};

export type AddParticipantToDocumentResponse = {
  id: string;
  participant_name: string;
  action: string;
  depositary: string;
  document_id: string;
  document_file: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type CreateDocumentPayload = {
  title: string;
  category_id: string;
  file_path: string;
  document_type: string;
  conclusion_info: string;
  eif_info: string;
  attachment_info: string;
  authentic_texts: string[];
  subject_terms: string[];
  agreement_type: string;
};

export type UpdateDocumentPayload = {
  title: string;
  // document_file: string;
  category_id: string;
  document_type: "treaty" | "judgement";
  conclusion_info: string;
  eif_info: string;
  attachment_info: string;
  authentic_texts: string[];
  subject_terms: string[];
  agreement_type: string;
};

export interface DocumentSection {
  id: string;
  title: string;
  text: string;
  page_number: number;
  section_order: number;
  document_id: string;
  created_at: string;
}
