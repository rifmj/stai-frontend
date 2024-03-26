import { useClientsApi } from "@/modules/clients/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";
import { useSingleItem } from "@/sdk/utils/hooks/useSingleItem";

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

export const usePublicClient = (projectId: string, clientId: string) => {
  const api = useClientsApi();
  return useSingleItem(
    `projects:${projectId}::public-clients:${clientId}`,
    () => api.getPublicClient(projectId, clientId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};
