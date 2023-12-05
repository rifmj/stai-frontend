import { useKnowledgeOriginApi } from "@/modules/knowledge-base/modules/origin/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useKnowledgeOriginsList = (projectId: string, kbId: string) => {
  const api = useKnowledgeOriginApi();
  return useItemsList(
    `projects:${projectId}::knowledge-base:${kbId}::origins`,
    () => api.list(projectId, kbId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};
