import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { useClientsList } from "@/modules/clients/hooks";
import { useProjectsList } from "@/modules/projects/hooks";
import { formatDate } from "@/sdk/utils/date";
import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

export const ClientsListPlainPageView = () => {
  const { projects } = useMobXStore();
  const clientsApi = useClientsApi();
  const clients = useClientsList(projects.currentProject);

  const projectsList = useProjectsList();

  useEffect(() => {
    if (!projects.currentProject && projectsList.list.length > 0) {
      projects.setCurrentProject(projectsList.list[0].project_id);
    }
  }, [projects.currentProject, projectsList.list]);

  const rows = clients.list.map((client) => (
    <Card
      key={client.client_id}
      padding="sm"
      radius="md"
      shadow="sm"
      withBorder
    >
      <Group justify="space-between" mb={"xs"}>
        <Text fw={500}>{client.name}</Text>
        {client.custom_fields?.room ? (
          <Badge color="pink">{client.custom_fields?.room}</Badge>
        ) : null}
      </Group>

      <Group gap={"xs"} mb={"xs"}>
        {client.custom_fields.check_in_date ? (
          <Text size={"sm"}>
            {formatDate(client.custom_fields.check_in_date, "d MMMM yyyy")}
          </Text>
        ) : null}
        <Divider orientation={"vertical"} />
        {client.custom_fields.check_out_date ? (
          <Text size={"sm"}>
            {formatDate(client.custom_fields.check_out_date, "d MMMM yyyy")}
          </Text>
        ) : null}
      </Group>

      <Button
        component={RRNavLink}
        fullWidth
        radius="md"
        size={"xs"}
        to={`/crm/clients/${client.client_id}`}
        variant={"light"}
      >
        Open
      </Button>
    </Card>
  ));

  return (
    <Stack gap={"lg"} p={"md"}>
      <Group justify="space-between">
        <Title order={4}>Latest added</Title>
      </Group>

      <Button component={RRNavLink} to={"/crm/clients/add"}>
        Add new guest
      </Button>

      <Stack>
        {!clients.isLoading && !clients.error && clients.list.length === 0 ? (
          <Alert color="indigo" title="Nothing found" variant="light" />
        ) : null}

        <Stack>
          {!clients.isLoading && !clients.error && clients.list.length === 0 ? (
            <Alert color="indigo" title="Nothing found" variant="light" />
          ) : (
            rows
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export const ClientsListPlainPage = observer(ClientsListPlainPageView);
