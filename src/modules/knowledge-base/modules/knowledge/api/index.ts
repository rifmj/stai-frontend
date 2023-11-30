import { useMobXStore } from "@/core/store/useMobXStore";
import {
  KnowledgeForm,
  KnowledgeListResponse,
  KnowledgeResponse,
} from "@/modules/knowledge-base/modules/knowledge/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class KnowledgeApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, kbId: string, data: KnowledgeForm) {
    const response = await this.deps.api.post<KnowledgeResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/knowledge`,
      data,
    );
    return response.data;
  }

  async get(projectId: string, kbId: string, knowledgeId: string) {
    const data = await this.deps.api.get<KnowledgeResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/knowledge/${knowledgeId}`,
    );
    return data.data;
  }

  async list(projectId: string, kbId: string) {
    const data = await this.deps.api.get<KnowledgeListResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/knowledge`,
    );
    return data.data;
  }

  async update(
    projectId: string,
    id: string,
    knowledgeId: string,
    data: KnowledgeForm,
  ) {
    const response = await this.deps.api.post<KnowledgeResponse>(
      `projects/${projectId}/knowledge-base/${id}/knowledge/${knowledgeId}`,
      data,
    );
    return response.data;
  }
}

export const useKnowledgeApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new KnowledgeApi({ api }), [api]);
};
