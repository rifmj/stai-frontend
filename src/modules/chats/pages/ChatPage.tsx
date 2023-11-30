import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatMessages } from "@/modules/chats/hooks";
import {
  Alert,
  Button,
  Group,
  Stack,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { IconInfoCircle, IconMessage, IconRefresh } from "@tabler/icons-react";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";

export const ChatPageView = () => {
  const { projects } = useMobXStore();

  const { chatId } = useParams();
  const messages = useChatMessages(projects.currentProject, chatId);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Chat</Title>
        <Button
          onClick={() => messages.mutate()}
          rightSection={<IconRefresh size={14} />}
          size={"xs"}
          variant={"light"}
        >
          Refresh
        </Button>
      </Group>

      <Timeline active={1} bulletSize={24} lineWidth={2}>
        {messages.list.map((value) => (
          <Timeline.Item
            bullet={<IconMessage size={12} />}
            key={value.message_id}
            title={value.role}
          >
            <Text c="dimmed" size="sm">
              {value.content}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>

      {messages.list.length === 0 ? (
        <Alert
          color="indigo"
          icon={<IconInfoCircle />}
          title="Nothing found"
          variant="light"
        />
      ) : null}

      {/*{chats.list.map((value) => (*/}
      {/*  <Paper key={value.chat_id} p="md" shadow="xs" withBorder>*/}
      {/*    <Stack>*/}
      {/*      <Stack gap={4}>*/}
      {/*        <Text size={"md"}>*/}
      {/*          {value.client.name} (*/}
      {/*          {value.client.custom_fields?.first_name ?? ""})*/}
      {/*        </Text>*/}
      {/*        <Text size={"xs"}>{value.client_id}</Text>*/}
      {/*      </Stack>*/}
      {/*    </Stack>*/}
      {/*  </Paper>*/}
      {/*))}*/}
    </Stack>
  );
};

export const ChatPage = observer(ChatPageView);
