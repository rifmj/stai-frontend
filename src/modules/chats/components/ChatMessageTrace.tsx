import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatMessageTrace } from "@/modules/chats/hooks";
import { Badge, Group, Paper, Stack, Text } from "@mantine/core";
import React from "react";
import { JSONTree } from "react-json-tree";

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
  return (
    <Stack>
      <Stack gap={0}></Stack>
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
