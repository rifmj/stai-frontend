import { useMobXStore } from "@/core/store/useMobXStore";
import {
  CreateProject,
  ProjectResponse,
  ProjectsListResponse,
  UpdateProject,
} from "@/modules/channels/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class ProjectsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(data: CreateProject) {
    const response = await this.deps.api.post<ProjectResponse>(
      `projects`,
      data,
    );
    return response.data;
  }

  async get(id: string) {
    const data = await this.deps.api.get<ProjectResponse>(`projects/${id}`);
    return data.data;
  }

  async list() {
    console.info("List projects");
    const data = await this.deps.api.get<ProjectsListResponse>(`projects`);
    return data.data;
  }

  async update(id: string, data: UpdateProject) {
    const response = await this.deps.api.put<ProjectResponse>(
      `projects/${id}`,
      data,
    );
    return response.data;
  }
}

export const useProjectsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new ProjectsApi({ api }), [api]);
};
