import { useClientsApi } from "@/modules/clients/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useClientsList = (projectId: string) => {
  const api = useClientsApi();
  return useItemsList(
    `projects:${projectId}::clients`,
    () => api.list(projectId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};
