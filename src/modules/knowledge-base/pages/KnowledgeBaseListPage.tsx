import { useMobXStore } from "@/core/store/useMobXStore";
import { useKnowledgeBaseApi } from "@/modules/knowledge-base/api";
import { KnowledgeBaseModalContent } from "@/modules/knowledge-base/components/KnowledgeBaseModalContent";
import { useKnowledgeBaseList } from "@/modules/knowledge-base/hooks";
import { KnowledgeBaseListItem } from "@/modules/knowledge-base/types";
import {
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

export const KnowledgeBaseListPage = () => {
  const { projects } = useMobXStore();
  const knowledgeBaseApi = useKnowledgeBaseApi();
  const knowledgeBase = useKnowledgeBaseList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<KnowledgeBaseListItem>(null);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Knowledge base</Title>
        <Button onClick={open} size={"xs"}>
          Add knowledge base
        </Button>
      </Group>

      <Stack>
        {!knowledgeBase.isLoading &&
        !knowledgeBase.error &&
        knowledgeBase.list.length === 0 ? (
          <Alert
            color="indigo"
            icon={<IconInfoCircle />}
            title="Nothing found"
            variant="light"
          />
        ) : null}
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
        title={item ? "Edit knowledge base" : "Add knowledge base"}
      >
        <KnowledgeBaseModalContent
          onSubmit={async (values) => {
            await (item
              ? knowledgeBaseApi.update(
                  projects.currentProject,
                  item.kb_id,
                  values,
                )
              : knowledgeBaseApi.create(projects.currentProject, values));
            await knowledgeBase.mutate();
            setItem(null);
            close();
          }}
          initialValues={item}
        />
      </Modal>
    </Stack>
  );
};
