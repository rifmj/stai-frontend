export type KnowledgeType = "Pdf" | "TextDocument" | "WebPage";

export interface KnowledgeOriginListItem {
  attributes?: any;
  description?: string;
  hash?: string;
  kb_id: string;
  knowledge_origin_id: string;
  name?: string;
  text: string;
  type: KnowledgeType;
}

export interface CreateKnowledgeOrigin {
  attributes?: any; // JSON or specific type for additional attributes
  description?: string; // Textual description or content of the KnowledgeOrigin
  name?: string; // Textual description or content of the KnowledgeOrigin
  text: string; // Textual description or content of the KnowledgeOrigin
  type: KnowledgeType; // Enum or string representing the type
}

export interface UpdateKnowledgeOrigin {
  attributes?: any;
  text?: string;
}

export type KnowledgeOriginForm = Exclude<
  KnowledgeOriginListItem,
  "kb_id" | "knowledge_origin_id"
>;

export type KnowledgeOriginListResponse = KnowledgeOriginListItem[];
export type KnowledgeOriginResponse = KnowledgeOriginListItem;
