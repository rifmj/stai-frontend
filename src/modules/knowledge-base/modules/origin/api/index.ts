import { useMobXStore } from "@/core/store/useMobXStore";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

import {
  CreateKnowledgeOrigin,
  KnowledgeOriginResponse,
  UpdateKnowledgeOrigin,
} from "../types";

export default class KnowledgeOriginApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, kbId: string, data: CreateKnowledgeOrigin) {
    const response = await this.deps.api.post<KnowledgeOriginResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/origins`,
      data,
    );
    return response.data;
  }

  async delete(projectId: string, kbId: string, id: string) {
    await this.deps.api.delete<KnowledgeOriginResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/origins/${id}`,
    );
    return true;
  }

  async get(projectId: string, kbId: string, id: string) {
    const data = await this.deps.api.get<KnowledgeOriginResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/origins/${id}`,
    );
    return data.data;
  }

  async list(projectId: string, kbId: string) {
    const data = await this.deps.api.get<KnowledgeOriginResponse[]>(
      `projects/${projectId}/knowledge-base/${kbId}/origins`,
    );
    return data.data;
  }

  async update(
    projectId: string,
    kbId: string,
    id: string,
    data: UpdateKnowledgeOrigin,
  ) {
    const response = await this.deps.api.put<KnowledgeOriginResponse>(
      `projects/${projectId}/knowledge-base/${kbId}/origins/${id}`,
      data,
    );
    return response.data;
  }
}

export const useKnowledgeOriginApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new KnowledgeOriginApi({ api }), [api]);
};
