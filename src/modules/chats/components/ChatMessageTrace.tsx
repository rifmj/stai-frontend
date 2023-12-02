import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatMessageTrace } from "@/modules/chats/hooks";
import {
  Badge,
  Divider,
  Group,
  Mark,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconClockFilled,
  IconPentagon,
  IconPentagonFilled,
  IconTimeDuration0,
  IconTimeline,
} from "@tabler/icons-react";
import React, { useCallback } from "react";
import { JSONTree } from "react-json-tree";

const filterKeys = (value) => !["duration", "end", "start"].includes(value);

const getMarkColor = (duration: number) => {
  if (duration >= 2000) {
    return "red";
  }
  if (duration >= 1500) {
    return "orange";
  }
  if (duration >= 1000) {
    return "yellow";
  }
  return "green";
};

export const ChatMessageTrace = (properties: {
  chatId: string;
  messageId: string;
}) => {
  const { projects } = useMobXStore();
  const trace = useChatMessageTrace(
    projects.currentProject,
    properties.chatId,
    properties.messageId,
  );
  const spans = trace.list.flatMap((value, index, array) => {
    const tags = Object.keys(value.attributes).filter((value) =>
      filterKeys(value),
    );
    if (tags.length === 0) return [];
    const tag = tags[0];
    const previousStart = array[index - 1] ?? array[0];
    return [
      {
        data: value.attributes,
        delta: value.attributes.start - previousStart.attributes.start,
        duration: value.attributes.duration,
        end: value.attributes.end,
        id: value.span_id,
        start: value.attributes.start,
        type: tag,
      },
    ];
  });

  const renderRow = (key: string, value: string) => (
    <Text size={"xs"}>
      <strong>{key}: </strong>
      {value}
    </Text>
  );

  const renderRowIfExists = (key: string, value: string) => {
    return value ? renderRow(key, value) : null;
  };

  return (
    <Stack>
      <Stack gap={0}>
        {spans.map((value) => (
          <Stack gap={4}>
            <Badge color={"grape"} size="xs" variant="light">
              {value.type}
            </Badge>
            {renderRowIfExists(`Project Id`, value.data.project?.project_id)}
            {renderRowIfExists(`Channel Id`, value.data.channel?.channel_id)}
            {renderRowIfExists(`Chat Id`, value.data.message?.chat_id)}
            {renderRowIfExists(`Client Id`, value.data.message?.client_id)}
            {renderRowIfExists(`Message Id`, value.data.message?.message_id)}
            {renderRowIfExists(`Request`, value.data.database?.request)}
            {renderRowIfExists(`Request`, value.data.database?.result?.request)}
            {renderRowIfExists(`Request`, value.data.mixed?.request)}
            {renderRowIfExists(`Type`, value.data.openai?.type)}
            {renderRowIfExists(`Action`, value.data.channel?.action)}
            {value.duration ? (
              <Tooltip label="Duration" offset={5} position="bottom">
                <Group gap={4}>
                  <IconClockFilled size={12} />
                  <Text size={"xs"}>
                    {Number.parseFloat(value.duration).toFixed(2)} ms
                  </Text>
                </Group>
              </Tooltip>
            ) : null}
            <Divider
              label={value.delta ? `+ ${value.delta?.toFixed(2)} ms` : null}
              mb={8}
              mt={4}
            />
          </Stack>
        ))}
      </Stack>
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
                  .filter((value) => filterKeys(value))
                  .map((value) => (
                    <Badge color={"grape"} size="xs" variant="light">
                      {value}
                    </Badge>
                  ))}
              </Group>
            </Group>
            {/*@ts-ignore*/}
            <JSONTree
              theme={{
                author: "wimer hazenberg (http://www.monokai.nl)",
                base00: "#272822",
                base01: "#383830",
                base02: "#49483e",
                base03: "#75715e",
                base04: "#a59f85",
                base05: "#f8f8f2",
                base06: "#f5f4f1",
                base07: "#f9f8f5",
                base08: "#f92672",
                base09: "#fd971f",
                base0A: "#f4bf75",
                base0B: "#a6e22e",
                base0C: "#a1efe4",
                base0D: "#66d9ef",
                base0E: "#ae81ff",
                base0F: "#cc6633",
                scheme: "monokai",
              }}
              data={value.attributes}
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
