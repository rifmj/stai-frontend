import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatsApi } from "@/modules/chats/api";
import { ChatMessageTrace } from "@/modules/chats/components/ChatMessageTrace";
import { useChatMessages } from "@/modules/chats/hooks";
import { formatDate } from "@/sdk/utils/date";
import {
  Alert,
  Box,
  Button,
  Group,
  Notification,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  Timeline,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconHammer,
  IconInfoCircle,
  IconInputAi,
  IconPlus,
  IconRefresh,
  IconReportAnalytics,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";

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
              ) : value.role === "Tool" ? (
                <IconHammer size={12} />
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
                    : value.role === "Tool"
                      ? { deg: 0, from: "red", to: "pink" }
                      : { deg: 0, from: "lime", to: "green" }
                }
                size="sm"
                variant="gradient"
              >
                {value.role}
              </Text>
              <Group>
                {value.role === "User" ? (
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
                ) : null}
                <Text c="dimmed" size="xs">
                  {formatDate(value.datetime)}
                </Text>
              </Group>
            </Group>
            <Paper p="xs" shadow="sm" withBorder>
              <Stack gap={"sm"}>
                {value.name || value.tool_call_id ? (
                  <Group justify={"space-between"}>
                    {value.name ? <Title order={5}>{value.name}</Title> : null}
                    <Text c={"dimmed"} size="xs">
                      {value.tool_call_id}
                    </Text>
                  </Group>
                ) : null}
                {value.content ? <Text size="sm">{value.content}</Text> : null}
                {value.tool_calls?.length > 0 ? (
                  <Stack>
                    {value.tool_calls?.map((value) => {
                      const argumentsObjectString = value.function.arguments;
                      const parsed = JSON.parse(argumentsObjectString);
                      return (
                        <Notification
                          color="pink"
                          title={value.function.name}
                          withBorder
                          withCloseButton={false}
                        >
                          <Stack>
                            <Text color={"dimmed"} size={"xs"}>
                              {value.id}
                            </Text>
                            <Table
                              data={{
                                body: Object.keys(parsed).map((key) => [
                                  key,
                                  parsed[key],
                                ]),
                              }}
                              striped
                              withColumnBorders
                              withTableBorder
                            />
                          </Stack>
                        </Notification>
                      );
                    })}
                  </Stack>
                ) : null}
              </Stack>
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
