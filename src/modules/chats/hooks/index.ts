import { useChatsApi } from "@/modules/chats/api";
import { useItemsList } from "@/sdk/utils/hooks/useItemsList";

export const useChatsList = (projectId: string) => {
  const api = useChatsApi();
  return useItemsList(
    `projects:${projectId}::chats`,
    () => api.get(projectId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};

export const useChatMessages = (projectId: string, chatId: string) => {
  const api = useChatsApi();
  return useItemsList(
    `projects:${projectId}::chats:${chatId}`,
    () => api.getMessages(projectId, chatId),
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};

export const useChatMessageTrace = (
  projectId: string,
  chatId: string,
  messageId: string,
) => {
  const api = useChatsApi();
  return useItemsList(
    `projects:${projectId}::chats:${chatId}::messages:${messageId}:trace`,
    async () => {
      const data = await api.getMessageTrace(projectId, chatId, messageId);
      return data.spans;
    },
    (item) => item,
    {
      dedupingInterval: 60e3,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
};
