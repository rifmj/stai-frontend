export interface KnowledgeListItem {
  kb_id: string;
  knowledge_id: string;
  text: string;
}

export type KnowledgeForm = Exclude<
  KnowledgeListItem,
  "kb_id" | "knowledge_id"
>;

export type KnowledgeListResponse = KnowledgeListItem[];
export type KnowledgeResponse = KnowledgeListItem;
