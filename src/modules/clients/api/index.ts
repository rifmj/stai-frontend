import { useMobXStore } from "@/core/store/useMobXStore";
import {
  ClientListResponse,
  ClientResponse,
  CreateClient,
  UpdateClient,
} from "@/modules/clients/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class ClientsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async create(projectId: string, data: CreateClient) {
    const response = await this.deps.api.post<ClientResponse>(
      `projects/${projectId}/clients`,
      data,
    );
    return response.data;
  }

  async delete(projectId: string, id: string) {
    const response = await this.deps.api.delete<ClientResponse>(
      `projects/${projectId}/clients/${id}`,
    );
    return true;
  }

  async get(projectId: string, id: string) {
    const data = await this.deps.api.get<ClientResponse>(
      `projects/${projectId}/clients/${id}`,
    );
    return data.data;
  }

  async list(projectId: string) {
    const data = await this.deps.api.get<ClientListResponse>(
      `projects/${projectId}/clients`,
    );
    return data.data;
  }

  async update(projectId: string, id: string, data: UpdateClient) {
    const response = await this.deps.api.put<ClientResponse>(
      `projects/${projectId}/clients/${id}`,
      data,
    );
    return response.data;
  }
}

export const useClientsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new ClientsApi({ api }), [api]);
};
