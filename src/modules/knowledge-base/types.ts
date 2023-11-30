export interface KnowledgeBaseListItem {
  kb_id: string;
  name: string;
  project_id: string;
}

export type KnowledgeBaseListResponse = KnowledgeBaseListItem[];
export type KnowledgeBaseResponse = KnowledgeBaseListItem;
