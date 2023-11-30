import { useMobXStore } from "@/core/store/useMobXStore";
import {
  CreateProject,
  ProjectResponse,
  ProjectsListResponse,
  UpdateProject,
} from "@/modules/channels/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class ChannelsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(data: CreateProject) {
    const response = await this.deps.api.post<ProjectResponse>(
      `channels`,
      data,
    );
    return response.data;
  }

  async get(id: string) {
    const data = await this.deps.api.get<ProjectResponse>(`channels/${id}`);
    return data.data;
  }

  async list(projectId: string) {
    const data = await this.deps.api.get<ProjectsListResponse>(
      `projects/${projectId}/channels`,
    );
    return data.data;
  }

  async update(id: string, data: UpdateProject) {
    const response = await this.deps.api.post<ProjectResponse>(
      `channels/${id}`,
      data,
    );
    return response.data;
  }
}

export const useChannelsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new ChannelsApi({ api }), [api]);
};
