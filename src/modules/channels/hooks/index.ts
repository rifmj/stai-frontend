import { useChannelsApi } from "@/modules/channels/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useChannelsList = (projectId: string) => {
  const api = useChannelsApi();
  return useItemsList(
    `projects:${projectId}::channels`,
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
