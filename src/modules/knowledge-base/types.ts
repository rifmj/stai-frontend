export interface KnowledgeBaseListItem {
  kb_id: string;
  name: string;
  project_id: string;
}

export type CreateKnowledgeBase = Exclude<
  KnowledgeBaseListItem,
  "kb_id" | "project_id"
>;

export type KnowledgeBaseListResponse = KnowledgeBaseListItem[];
export type KnowledgeBaseResponse = KnowledgeBaseListItem;
