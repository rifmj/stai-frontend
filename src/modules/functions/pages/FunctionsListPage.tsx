import { useMobXStore } from "@/core/store/useMobXStore";
import { ChannelModalContent } from "@/modules/channels/components/ChannelModalContent";
import { ChannelsListItem } from "@/modules/channels/types";
import { useFunctionsApi } from "@/modules/functions/api";
import { useFunctionsList } from "@/modules/functions/hooks";
import { Button, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const FunctionsListPageView = () => {
  const { projects } = useMobXStore();
  const { create, update } = useFunctionsApi();
  const functions = useFunctionsList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [channel, setChannel] = useState<ChannelsListItem>(null);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Functions</Title>
        <Button onClick={open} size={"xs"}>
          Add function
        </Button>
      </Group>

      <Stack>
        {!functions.isLoading &&
        !functions.error &&
        functions.list.length === 0 ? (
          <Alert
            color="indigo"
            icon={<IconInfoCircle />}
            title="Nothing found"
            variant="light"
          />
        ) : null}
        {functions.list.map((value) => (
          <Paper key={value.function_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack gap={"xs"}>
                <Title order={4}>{value.name}</Title>
                <Text size={"sm"}>{value.description}</Text>
              </Stack>
              <Group>
                <Button
                  onClick={() => {
                    // setChannel(value);
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

export const FunctionsListPage = observer(FunctionsListPageView);
