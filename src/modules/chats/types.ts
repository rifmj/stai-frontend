export interface ChatsListItem {
  chat_id: string;
  client: string;
  client_id: string;
  project_id: string;
  state: string;
}

export type ChatsListResponse = ChatsListItem[];
export type ChatResponse = ChatsListItem;