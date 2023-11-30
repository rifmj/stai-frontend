import { useMobXStore } from "@/core/store/useMobXStore";
import { ChannelForm } from "@/modules/channels/components/ChannelModalContent";
import {
  FunctionResponse,
  FunctionsListResponse,
} from "@/modules/functions/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class FunctionsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, data: ChannelForm) {
    const response = await this.deps.api.post<FunctionResponse>(
      `projects/${projectId}/functions`,
      data,
    );
    return response.data;
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

  async update(projectId: string, id: string, data: ChannelForm) {
    const response = await this.deps.api.post<FunctionResponse>(
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
