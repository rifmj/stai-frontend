import { useMobXStore } from "@/core/store/useMobXStore";
import {
  CreateKnowledgeBase,
  KnowledgeBaseListResponse,
  KnowledgeBaseResponse,
} from "@/modules/knowledge-base/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class KnowledgeBaseApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, data: CreateKnowledgeBase) {
    const response = await this.deps.api.post<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base`,
      data,
    );
    return response.data;
  }

  async get(projectId: string, id: string) {
    const data = await this.deps.api.get<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base/${id}`,
    );
    return data.data;
  }

  async list(projectId: string) {
    const data = await this.deps.api.get<KnowledgeBaseListResponse>(
      `projects/${projectId}/knowledge-base`,
    );
    return data.data;
  }

  async update(projectId: string, id: string, data: CreateKnowledgeBase) {
    const response = await this.deps.api.put<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base/${id}`,
      data,
    );
    return response.data;
  }
}

export const useKnowledgeBaseApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new KnowledgeBaseApi({ api }), [api]);
};
