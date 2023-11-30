import { useKnowledgeBaseApi } from "@/modules/knowledge-base/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";
import { useSingleItem } from "@/sdk/utils/hooks/useSingleItem";

export const useKnowledgeBaseList = (projectId: string) => {
  const api = useKnowledgeBaseApi();
  return useItemsList(
    `projects:${projectId}::knowledge-base`,
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

export const useKnowledgeBase = (projectId: string, kbId: string) => {
  const api = useKnowledgeBaseApi();
  return useSingleItem(
    `projects:${projectId}::knowledge-base:${kbId}`,
    () => api.get(projectId, kbId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};
