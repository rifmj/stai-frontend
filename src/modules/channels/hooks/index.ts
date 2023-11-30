import { useChannelsApi } from "@/modules/channels/api";
import { useProjectsApi } from "@/modules/projects/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useChannelsList = (projectId: string) => {
  const api = useChannelsApi();
  return useItemsList(
    `projects:${projectId}::channels`,
    () => api.list(projectId),
    (item) => item,
  );
};
