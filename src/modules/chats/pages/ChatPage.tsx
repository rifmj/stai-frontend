import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatsApi } from "@/modules/chats/api";
import { useChatMessageTrace, useChatMessages } from "@/modules/chats/hooks";
import { formatDate } from "@/sdk/utils/date";
import {
  Alert,
  Badge,
  Box,
  Button,
  Center,
  Group,
  JsonInput,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Timeline,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconHttpTrace,
  IconInfoCircle,
  IconInputAi,
  IconMessage,
  IconPlus,
  IconRefresh,
  IconReportAnalytics,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";

const ChatMessageTrace = (properties: {
  chatId: string;
  messageId: string;
}) => {
  const { projects } = useMobXStore();
  const trace = useChatMessageTrace(
    projects.currentProject,
    properties.chatId,
    properties.messageId,
  );
  return (
    <Stack>
      {trace.list.map((value, index, array) => (
        <Paper>
          <Stack gap={"md"}>
            <Group justify={"space-between"}>
              <Stack>
                {value.attributes.start &&
                array[index - 1]?.attributes?.start ? (
                  <Text c={"dimmed"} size={"xs"}>
                    <strong>+</strong>{" "}
                    {value.attributes.start -
                      array[index - 1]?.attributes.start}{" "}
                    ms
                  </Text>
                ) : null}
                <Text c={"dimmed"} size={"xs"}>
                  <strong>ID</strong>: {value.span_id}
                </Text>
              </Stack>
              <Group gap={"xs"}>
                {Object.keys(value.attributes)
                  .filter(
                    (value) => !["duration", "end", "start"].includes(value),
                  )
                  .map((value) => (
                    <Badge color={"grape"} size="xs" variant="light">
                      {value}
                    </Badge>
                  ))}
              </Group>
            </Group>
            {/*@ts-ignore*/}
            <JsonInput
              autosize
              maxRows={12}
              minRows={3}
              value={JSON.stringify(value.attributes, null, 2)}
            />
            <Stack gap={4}>
              {value.attributes.duration ? (
                <Text c={"dimmed"} size={"xs"}>
                  <strong>Duration</strong>:{" "}
                  {Number.parseFloat(value.attributes.duration)} ms
                </Text>
              ) : null}
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export const ChatPageView = () => {
  const { projects } = useMobXStore();

  const chatsApi = useChatsApi();
  const { chatId } = useParams();
  const messages = useChatMessages(projects.currentProject, chatId);

  const [messageText, setMessageText] = React.useState("");

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Chat</Title>
        <Group>
          <Button
            onClick={async () => {
              await chatsApi.clearChat(projects.currentProject, chatId);
              await messages.mutate();
            }}
            color={"orange"}
            rightSection={<IconTrash size={14} />}
            size={"xs"}
            variant={"light"}
          >
            Clear
          </Button>
          <Button
            onClick={() => messages.mutate()}
            rightSection={<IconRefresh size={14} />}
            size={"xs"}
            variant={"light"}
          >
            Refresh
          </Button>
        </Group>
      </Group>

      <Timeline bulletSize={24} lineWidth={2}>
        <Group>
          <Box style={{ flex: 1 }}>
            <TextInput
              onChange={(event) => setMessageText(event.target.value)}
              placeholder={"Message text..."}
              value={messageText}
            />
          </Box>
          <Button
            onClick={async () => {
              try {
                await chatsApi.sendMessage(
                  projects.currentProject,
                  chatId,
                  messageText,
                );
                notifications.show({
                  color: "teal",
                  message: "Message sent",
                  title: "Success! ✅",
                });
              } catch {
                notifications.show({
                  color: "red",
                  message: "",
                  title: "Error",
                });
              }
            }}
            leftSection={<IconPlus />}
            size={"xs"}
          >
            Send
          </Button>
        </Group>

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
              <Group>
                <Button
                  onClick={() => {
                    modals.open({
                      children: (
                        <ChatMessageTrace
                          chatId={chatId}
                          messageId={value.message_id}
                        />
                      ),
                      id: "trace",
                      title: "Trace",
                    });
                  }}
                  rightSection={<IconReportAnalytics size={14} />}
                  size={"xs"}
                  variant={"light"}
                >
                  Trace
                </Button>
                <Text c="dimmed" size="xs">
                  {formatDate(value.datetime)}
                </Text>
              </Group>
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
