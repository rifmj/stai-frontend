export interface ChatsListItem {
  chat_id: string;
  client: {
    custom_fields?: {
      first_name: string;
    };
    name: string;
  };
  client_id: string;
  project_id: string;
  state: string;
}

export interface ChatMessagesListItem {
  content: string;
  datetime: string;
  message_id: string;
  name: string;
  role: string;
  tool_call_id: string;
  tool_calls: any;
}

export type ChatsListResponse = ChatsListItem[];
export type ChatResponse = ChatsListItem;
