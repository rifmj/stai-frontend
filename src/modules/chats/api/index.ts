import { useMobXStore } from "@/core/store/useMobXStore";
import { ChatMessagesListItem, ChatsListResponse } from "@/modules/chats/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class ChatsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async clearChat(projectId: string, chatId: string) {
    const data = await this.deps.api.post<ChatMessagesListItem[]>(
      `projects/${projectId}/chats/${chatId}/messages/clear`,
    );
    return data.data;
  }

  async get(projectId: string) {
    const data = await this.deps.api.get<ChatsListResponse>(
      `projects/${projectId}/chats`,
    );
    return data.data;
  }

  async getMessageTrace(projectId: string, chatId: string, messageId: string) {
    const data = await this.deps.api.get<{
      spans: {
        attributes: any;
        name: string;
        parent_span_id: string;
        span_id: string;
        trace_id: string;
      }[];
    }>(`projects/${projectId}/chats/${chatId}/messages/${messageId}/trace`);
    return data.data;
  }

  async getMessages(projectId: string, chatId: string) {
    const data = await this.deps.api.get<ChatMessagesListItem[]>(
      `projects/${projectId}/chats/${chatId}/messages`,
    );
    return data.data;
  }

  async sendMessage(projectId: string, chatId: string, text: string) {
    const data = await this.deps.api.post<ChatMessagesListItem[]>(
      `projects/${projectId}/chats/${chatId}/messages/send`,
      { text },
    );
    return data.data;
  }
}

export const useChatsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new ChatsApi({ api }), [api]);
};
