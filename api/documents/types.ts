export type AddParticipantToDocumentRequest = {
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
