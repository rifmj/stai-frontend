import { useFunctionsApi } from "@/modules/functions/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useFunctionsList = (projectId: string) => {
  const api = useFunctionsApi();
  return useItemsList(
    `projects:${projectId}::functions`,
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
