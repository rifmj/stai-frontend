import { useMobXStore } from "@/core/store/useMobXStore";
import { ChannelForm } from "@/modules/channels/components/ChannelModalContent";
import {
  ChannelResponse,
  ChannelsListResponse,
  ProjectResponse,
} from "@/modules/channels/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class ChannelsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, data: ChannelForm) {
    const response = await this.deps.api.post<ProjectResponse>(
      `projects/${projectId}/channels`,
      data,
    );
    return response.data;
  }

  async delete(projectId: string, id: string) {
    const response = await this.deps.api.post<ProjectResponse>(
      `projects/${projectId}/channels/${id}`,
    );
    return response.data;
  }

  async get(projectId: string, id: string) {
    const data = await this.deps.api.get<ChannelResponse>(
      `projects/${projectId}/channels/${id}`,
    );
    return data.data;
  }

  async getWebhook(projectId: string, id: string) {
    const data = await this.deps.api.get<ChannelResponse>(
      `projects/${projectId}/channels/${id}/webhook`,
    );
    return data.data;
  }

  async list(projectId: string) {
    const data = await this.deps.api.get<ChannelsListResponse>(
      `projects/${projectId}/channels`,
    );
    return data.data;
  }

  async refreshWebhook(projectId: string, id: string) {
    const data = await this.deps.api.put<ChannelResponse>(
      `projects/${projectId}/channels/${id}/webhook`,
    );
    return data.data;
  }

  async update(projectId: string, id: string, data: ChannelForm) {
    const response = await this.deps.api.post<ProjectResponse>(
      `projects/${projectId}/channels/${id}`,
      data,
    );
    return response.data;
  }
}

export const useChannelsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new ChannelsApi({ api }), [api]);
};
