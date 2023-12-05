import { useMobXStore } from "@/core/store/useMobXStore";
import {
  KnowledgeForm,
  KnowledgeSearchListItem,
} from "@/modules/knowledge-base/modules/knowledge/types";
import { KnowledgeType } from "@/modules/knowledge-base/modules/origin/types";
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

  async extend(
    projectId: string,
    id: string,
    data: { attributes: any; type: KnowledgeType },
  ) {
    const response = await this.deps.api.post<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base/${id}/extend`,
      data,
    );
    return response.data;
  }

  async extract(projectId: string, id: string, knowledgeOriginId: string) {
    const response = await this.deps.api.post<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base/${id}/extract?knowledgeOriginId=${knowledgeOriginId}`,
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

  async search(projectId: string, id: string, query: string) {
    const response = await this.deps.api.get<KnowledgeSearchListItem[]>(
      `projects/${projectId}/knowledge-base/${id}/search?query=${query}`,
    );
    return response.data;
  }

  async update(projectId: string, id: string, data: CreateKnowledgeBase) {
    const response = await this.deps.api.put<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base/${id}`,
      data,
    );
    return response.data;
  }

  async upload(
    projectId: string,
    id: string,
    data: { file: File; name: string; type: KnowledgeType },
  ) {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.file.name);
    formData.append("type", "Pdf");
    const response = await this.deps.api.post<KnowledgeBaseResponse>(
      `projects/${projectId}/knowledge-base/${id}/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  }
}

export const useKnowledgeBaseApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new KnowledgeBaseApi({ api }), [api]);
};
