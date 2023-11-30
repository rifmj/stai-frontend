import { useMobXStore } from "@/core/store/useMobXStore";
import { useChannelsApi } from "@/modules/channels/api";
import { ChannelModalContent } from "@/modules/channels/components/ChannelModalContent";
import { useChannelsList } from "@/modules/channels/hooks";
import { ChannelsListItem } from "@/modules/channels/types";
import { useFunctionsApi } from "@/modules/functions/api";
import { useFunctionsList } from "@/modules/functions/hooks";
import { useKnowledgeBaseApi } from "@/modules/knowledge-base/api";
import { useKnowledgeBaseList } from "@/modules/knowledge-base/hooks";
import { KnowledgeBaseListItem } from "@/modules/knowledge-base/types";
import {
  Button,
  Group,
  Modal,
  NavLink,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

export const KnowledgeBaseListPage = () => {
  const { projects } = useMobXStore();
  const { create, update } = useKnowledgeBaseApi();
  const knowledgeBase = useKnowledgeBaseList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<KnowledgeBaseListItem>(null);

  console.info("knowledgeBase", knowledgeBase.list);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Knowledge base</Title>
        <Button onClick={open} size={"xs"}>
          Add knowledge base
        </Button>
      </Group>

      <Stack>
        {knowledgeBase.list.map((value) => (
          <Paper key={value.kb_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack gap={0}>
                <Title order={3}>{value.name}</Title>
              </Stack>
              <Group>
                <Button
                  component={RRNavLink}
                  size={"xs"}
                  to={`${value.kb_id}`}
                  variant={"light"}
                >
                  Open
                </Button>
                <Button
                  onClick={() => {
                    setItem(value);
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
          setItem(null);
        }}
        opened={opened}
        title="Add channel"
      >
        {/*<ChannelModalContent*/}
        {/*  onSubmit={async (values) => {*/}
        {/*    await (item*/}
        {/*      ? create(projects.currentProject, values)*/}
        {/*      : update(projects.currentProject, channel.channel_id, values));*/}
        {/*    setItem(null);*/}
        {/*    close();*/}
        {/*  }}*/}
        {/*  initialValues={channel}*/}
        {/*/>*/}
      </Modal>
    </Stack>
  );
};
