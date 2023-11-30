import { useMobXStore } from "@/core/store/useMobXStore";
import { useChannelsApi } from "@/modules/channels/api";
import { ChannelModalContent } from "@/modules/channels/components/ChannelModalContent";
import { useChannelsList } from "@/modules/channels/hooks";
import { ChannelsListItem } from "@/modules/channels/types";
import { Button, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const ChannelsListPageView = () => {
  const { projects } = useMobXStore();
  const { create, update } = useChannelsApi();
  const channels = useChannelsList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [channel, setChannel] = useState<ChannelsListItem>(null);

  console.info("cjh", channels.list);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Channels list</Title>
        <Button onClick={open} size={"xs"}>
          Add chanel
        </Button>
      </Group>

      <Stack>
        {channels.list.map((value) => (
          <Paper key={value.channel_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack gap={"xs"}>
                <Title order={3}>{value.type}</Title>
                <Text size={"xs"}>{value.api_key}</Text>
              </Stack>
              <Group>
                <Button
                  onClick={() => {
                    setChannel(value);
                    open();
                  }}
                  size={"xs"}
                  variant={"light"}
                >
                  Edit
                </Button>
              </Group>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Modal
        onClose={() => {
          close();
          setChannel(null);
        }}
        opened={opened}
        title="Add channel"
      >
        <ChannelModalContent
          onSubmit={async (values) => {
            await (channel
              ? create(projects.currentProject, values)
              : update(projects.currentProject, channel.channel_id, values));
            setChannel(null);
            close();
          }}
          initialValues={channel}
        />
      </Modal>
    </Stack>
  );
};

export const ChannelsListPage = observer(ChannelsListPageView);
