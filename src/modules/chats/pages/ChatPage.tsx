import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatMessages } from "@/modules/chats/hooks";
import { formatDate } from "@/sdk/utils/date";
import {
  Alert,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconInputAi,
  IconMessage,
  IconRefresh,
  IconUser,
} from "@tabler/icons-react";
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

      <Timeline bulletSize={24} lineWidth={2}>
        {messages.list.map((value) => (
          <Timeline.Item
            bullet={
              value.role === "User" ? (
                <IconUser size={12} />
              ) : (
                <IconInputAi size={12} />
              )
            }
            key={value.message_id}
          >
            <Group justify={"space-between"} mb={"xs"}>
              <Text
                gradient={
                  value.role === "User"
                    ? { deg: 0, from: "cyan", to: "teal" }
                    : { deg: 0, from: "lime", to: "green" }
                }
                size="sm"
                variant="gradient"
              >
                {value.role}
              </Text>
              <Text c="dimmed" size="xs">
                {formatDate(value.datetime)}
              </Text>
            </Group>
            <Paper p="xs" shadow="sm" withBorder>
              <Text size="sm">{value.content}</Text>
            </Paper>
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
