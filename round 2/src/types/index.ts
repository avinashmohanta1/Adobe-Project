export interface OutlineItem {
  level: "H1" | "H2" | "H3";
  text: string;
  page: number;
}

export interface OutlineData {
  title: string;
  outline: OutlineItem[];
}

export interface ExtractedSection {
  document: string;
  page_number: number;
  section_title: string;
  importance_rank: number;
}

export interface PersonaMetadata {
  input_documents: string[];
  persona: string;
  job_to_be_done: string;
  processing_timestamp: string;
}

export interface PersonaData {
  metadata: PersonaMetadata;
  extracted_sections: ExtractedSection[];
}