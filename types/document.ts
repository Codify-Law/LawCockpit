export interface Document {
  id: string;
  title: string;
  document_file: string;
  category: {
    id: string;
    name: string;
    description: null;
    created_at: string;
    updated_at: null;
  };
  num_sections: null;
  num_pages: null;
  vector_creation_status: string;
  document_type: string;
  conclusion_info: string;
  eif_info: string;
  attachment_info: string;
  authentic_texts: string[];
  subject_terms: string[];
  agreement_type: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentParticipant {
  id: string;
  participant_name: string;
  action: string;
  depositary: string;
  document_id: string;
  document_file: string;
  title: string;
  created_at: string;
  updated_at: string;
}
