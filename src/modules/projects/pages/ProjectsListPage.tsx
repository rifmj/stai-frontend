import { useMobXStore } from "@/core/store/useMobXStore";
import { ProjectsListItem } from "@/modules/channels/types";
import { useProjectsApi } from "@/modules/projects/api";
import { ProjectModalContent } from "@/modules/projects/components/ProjectModalContent";
import { useProjectsList } from "@/modules/projects/hooks";
import {
  Badge,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const ProjectsListPageView = () => {
  const { projects } = useMobXStore();
  const projectsApi = useProjectsApi();
  const projectsList = useProjectsList();
  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<ProjectsListItem>(null);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Projects</Title>
        <Button onClick={open} size={"xs"}>
          Add project
        </Button>
      </Group>

      <Stack>
        {projectsList.list.map((value) => (
          <Paper key={value.project_id} p="md" shadow="xs" withBorder>
            <Stack>
              {projects.currentProject === value.project_id ? (
                <Badge color="indigo" size="sm">
                  Selected
                </Badge>
              ) : null}
              <Stack gap={"xs"}>
                <Title order={4}>{value.project_name}</Title>
                <Text size={"sm"}>{value.description}</Text>
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
        title={item ? "Edit project" : "Add project"}
      >
        <ProjectModalContent
          onSubmit={async (values) => {
            await (item
              ? projectsApi.update(item.project_id, values)
              : projectsApi.create(values));
            await projectsList.mutate();
            setItem(null);
            close();
          }}
          initialValues={item}
        />
      </Modal>
    </Stack>
  );
};

export const ProjectsListPage = observer(ProjectsListPageView);
