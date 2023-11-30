import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatsList } from "@/modules/chats/hooks";
import { Alert, Group, Stack, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
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
      <Alert
        color="indigo"
        icon={<IconInfoCircle />}
        title="Nothing found"
        variant="light"
      />
    </Stack>
  );
};

export const ChatsListPage = observer(ChatsListPageView);
