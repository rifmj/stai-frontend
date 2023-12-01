import { useMobXStore } from "@/core/store/useMobXStore";
import {
  CreateFunction,
  FunctionResponse,
  FunctionsListResponse,
  UpdateFunction,
} from "@/modules/functions/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class FunctionsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, data: CreateFunction) {
    const response = await this.deps.api.post<FunctionResponse>(
      `projects/${projectId}/functions`,
      data,
    );
    return response.data;
  }

  async delete(projectId: string, id: string) {
    const response = await this.deps.api.delete<FunctionResponse>(
      `projects/${projectId}/functions/${id}`,
    );
    return true;
  }

  async generate(projectId: string, query: string) {
    const response = await this.deps.api.post<any>(
      `projects/${projectId}/functions/generate?query=${query}`,
    );
    return response.data?.data;
  }

  async get(projectId: string, id: string) {
    const data = await this.deps.api.get<FunctionResponse>(
      `projects/${projectId}/functions/${id}`,
    );
    return data.data;
  }

  async list(projectId: string) {
    const data = await this.deps.api.get<FunctionsListResponse>(
      `projects/${projectId}/functions`,
    );
    return data.data;
  }

  async update(projectId: string, id: string, data: UpdateFunction) {
    const response = await this.deps.api.put<FunctionResponse>(
      `projects/${projectId}/functions/${id}`,
      data,
    );
    return response.data;
  }
}

export const useFunctionsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new FunctionsApi({ api }), [api]);
};
