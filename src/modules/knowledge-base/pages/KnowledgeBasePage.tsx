import { useMobXStore } from "@/core/store/useMobXStore";
import { useKnowledgeBaseApi } from "@/modules/knowledge-base/api";
import {
  useKnowledgeBase,
  useKnowledgeBaseList,
} from "@/modules/knowledge-base/hooks";
import { useKnowledgeList } from "@/modules/knowledge-base/modules/knowledge/hooks";
import { KnowledgeListItem } from "@/modules/knowledge-base/modules/knowledge/types";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useMemo, useState } from "react";
import { NavLink as RRNavLink, useParams } from "react-router-dom";

export const KnowledgeBasePage = () => {
  const { projects } = useMobXStore();
  const { create, update } = useKnowledgeBaseApi();

  const { kbId } = useParams();

  const knowledgeBaseList = useKnowledgeBaseList(projects.currentProject);
  const knowledge = useKnowledgeList(projects.currentProject, kbId);

  const base = useMemo(() => {
    return knowledgeBaseList.list.find((value) => value.kb_id === kbId);
  }, [knowledgeBaseList, kbId]);

  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<KnowledgeListItem>(null);

  const breadcrumbs = [
    { href: "/kb", title: "Knowledge base" },
    {
      href: "",
      title: base?.name,
    },
  ].map((item, index) => (
    <Anchor component={RRNavLink} key={index} to={item.href}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack gap={"lg"}>
      <Breadcrumbs mt="xs" separator="→">
        {breadcrumbs}
      </Breadcrumbs>

      <Group justify="space-between">
        <Title order={4}>{base?.name}</Title>
        <Button onClick={open} size={"xs"}>
          Add knowledge
        </Button>
      </Group>

      <Stack>
        {knowledge.list.map((value) => (
          <Paper key={value.kb_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack gap={0}>
                <Text size={"md"}>{value.text}</Text>
              </Stack>
              <Group>
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
        {/*<ProjectModalContent*/}
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
