import { useSettingsApi } from "@/modules/settings/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";
import { useSingleItem } from "@/sdk/utils/hooks/useSingleItem";

export const useSettings = (projectId: string) => {
  const api = useSettingsApi();
  return useSingleItem(
    `projects:${projectId}::settings`,
    () => api.get(projectId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};

export const useModelsSettings = (projectId: string) => {
  const api = useSettingsApi();
  return useItemsList(
    `projects:${projectId}::settings:models`,
    () => api.getModels(projectId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};
