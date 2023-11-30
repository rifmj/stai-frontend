import { useProjectsApi } from "@/modules/projects/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useProjectsList = () => {
  const api = useProjectsApi();
  return useItemsList(
    "projects",
    () => api.list(),
    (item) => item,
  );
};
