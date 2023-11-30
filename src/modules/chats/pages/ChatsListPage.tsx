import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatsList } from "@/modules/chats/hooks";
import { Group, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react";
import React from "react";

export const ChatsListPageView = () => {
  const { projects } = useMobXStore();
  const chats = useChatsList(projects.currentProject);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Chats</Title>
      </Group>
    </Stack>
  );
};

export const ChatsListPage = observer(ChatsListPageView);
