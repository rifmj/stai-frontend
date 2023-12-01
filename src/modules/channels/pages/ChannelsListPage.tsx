import { useMobXStore } from "@/core/store/useMobXStore";
import { useChannelsApi } from "@/modules/channels/api";
import { ChannelModalContent } from "@/modules/channels/components/ChannelModalContent";
import { useChannelsList } from "@/modules/channels/hooks";
import { ChannelsListItem } from "@/modules/channels/types";
import {
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconInfoCircle,
  IconPencil,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const ChannelsListPageView = () => {
  const { projects } = useMobXStore();
  const channelsApi = useChannelsApi();
  const channels = useChannelsList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [channel, setChannel] = useState<ChannelsListItem>(null);

  console.info("cjh", channels.list);

  const openDeleteModal = (channelId: string) =>
    modals.openConfirmModal({
      labels: { cancel: "Cancel", confirm: "Confirm" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        await channelsApi.delete(projects.currentProject, channelId);
        await channels.mutate();
      },
      title: "Please confirm delete",
    });

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Channels list</Title>
        <Button onClick={open} size={"xs"}>
          Add chanel
        </Button>
      </Group>

      <Stack>
        {!channels.isLoading &&
        !channels.error &&
        channels.list.length === 0 ? (
          <Alert
            color="indigo"
            icon={<IconInfoCircle />}
            title="Nothing found"
            variant="light"
          />
        ) : null}

        <SimpleGrid cols={2}>
          {channels.list.map((value) => (
            <Paper key={value.channel_id} p="md" shadow="xs" withBorder>
              <Stack>
                <Stack gap={"xs"}>
                  <Title order={3}>{value.type}</Title>
                  <Text size={"xs"}>{value.api_key}</Text>
                </Stack>
                <Group gap={"xs"}>
                  <Button
                    onClick={() => {
                      setChannel(value);
                      open();
                    }}
                    rightSection={<IconPencil size={14} />}
                    size={"xs"}
                    variant={"light"}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      openDeleteModal(value.channel_id);
                    }}
                    color={"red"}
                    rightSection={<IconTrash size={14} />}
                    size={"xs"}
                    variant={"light"}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={async () => {
                      await channelsApi.getWebhook(
                        projects.currentProject,
                        value.channel_id,
                      );
                    }}
                    color={"blue"}
                    rightSection={<IconInfoCircle size={14} />}
                    size={"xs"}
                    variant={"light"}
                  >
                    Webhook info
                  </Button>
                  <Button
                    onClick={async () => {
                      await channelsApi.refreshWebhook(
                        projects.currentProject,
                        value.channel_id,
                      );
                    }}
                    color={"blue"}
                    rightSection={<IconRefresh size={14} />}
                    size={"xs"}
                    variant={"light"}
                  >
                    Refresh webhook
                  </Button>
                </Group>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>

      <Modal
        onClose={() => {
          close();
          setChannel(null);
        }}
        opened={opened}
        title={channel ? "Edit channel" : "Add channel"}
      >
        <ChannelModalContent
          onSubmit={async (values) => {
            await (channel
              ? channelsApi.create(projects.currentProject, values)
              : channelsApi.update(
                  projects.currentProject,
                  channel.channel_id,
                  values,
                ));
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
