import { useKnowledgeApi } from "@/modules/knowledge-base/modules/knowledge/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useKnowledgeList = (projectId: string, kbId: string) => {
  const api = useKnowledgeApi();
  return useItemsList(
    `projects:${projectId}::knowledge-base:${kbId}::knowledge`,
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
