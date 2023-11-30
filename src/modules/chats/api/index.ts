import { useMobXStore } from "@/core/store/useMobXStore";
import { ChatsListResponse } from "@/modules/chats/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class ChatsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async get(projectId: string) {
    const data = await this.deps.api.get<ChatsListResponse>(
      `projects/${projectId}/chats`,
    );
    return data.data;
  }
}

export const useChatsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new ChatsApi({ api }), [api]);
};
