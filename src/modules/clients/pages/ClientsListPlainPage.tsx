import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { useClientsList } from "@/modules/clients/hooks";
import { formatDate } from "@/sdk/utils/date";
import {
  Alert,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { observer } from "mobx-react";
import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";

export const ClientsListPlainPageView = () => {
  const { projects } = useMobXStore();
  const clientsApi = useClientsApi();
  const clients = useClientsList(projects.currentProject);

  const rows = clients.list.map((client) => (
    <Stack gap={"xs"} key={client.client_id}>
      <Group justify={"space-between"}>
        <Button
          component={RRNavLink}
          to={`/crm/clients/${client.client_id}`}
          variant={"transparent"}
        >
          <Title size={"md"}>{client.name || "No name"}</Title>
        </Button>
        <Text fw={"bold"} size={"sm"}>
          {client.custom_fields.room}
        </Text>
      </Group>
      <Group gap={"xs"}>
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
    </Stack>
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
