import { useMobXStore } from "@/core/store/useMobXStore";
import {
  AIModel,
  SettingsItem,
  SettingsResponse,
} from "@/modules/settings/types";
import Api from "@/sdk/services/Api";
import { useMemo } from "react";

export default class SettingsApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async get(projectId: string) {
    const data = await this.deps.api.get<SettingsResponse>(
      `projects/${projectId}/settings`,
    );
    return data.data;
  }

  /**
   * Get list of available models
   * @param projectId
   */
  async getModels(projectId: string) {
    const data = await this.deps.api.get<AIModel[]>(
      `projects/${projectId}/settings/models`,
    );
    return data.data;
  }

  async update(projectId: string, data: SettingsItem) {
    const response = await this.deps.api.post<SettingsResponse>(
      `projects/${projectId}/settings`,
      data,
    );
    return response.data;
  }
}

export const useSettingsApi = () => {
  const { api } = useMobXStore();
  return useMemo(() => new SettingsApi({ api }), [api]);
};
