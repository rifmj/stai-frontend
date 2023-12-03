import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { ClientModalContent } from "@/modules/clients/components/ClientModalContent";
import { useClientsList } from "@/modules/clients/hooks";
import {
  ClientListItem,
  CreateClient,
  UpdateClient,
} from "@/modules/clients/types";
import {
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  TableData,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const ClientsListPageView = () => {
  const { projects } = useMobXStore();
  const clientsApi = useClientsApi();
  const clients = useClientsList(projects.currentProject);

  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<ClientListItem>(null);

  const handleSubmit = async (values: UpdateClient) => {
    const data = { ...values };
    await (item
      ? clientsApi.update(projects.currentProject, item.client_id, data)
      : clientsApi.create(projects.currentProject, data as CreateClient));
    setItem(null);
    await clients.mutate();
    close();
  };

  const rows = clients.list.map((client) => (
    <Table.Tr key={client.client_id}>
      <Table.Td>{client.client_id}</Table.Td>
      <Table.Td>{client.name}</Table.Td>
      <Table.Td>{client.external_id || "N/A"}</Table.Td>
      <Table.Td>
        <Group>
          <Button
            onClick={() => {
              setItem(client);
              open();
            }}
            color="teal"
            size="xs"
          >
            <IconPencil size={14} />
          </Button>
          <Button
            onClick={async () => {
              await clientsApi.delete(
                projects.currentProject,
                client.client_id,
              );
              await clients.mutate();
            }}
            color={"red"}
            size={"xs"}
            variant={"light"}
          >
            <IconTrash size={14} />
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Clients</Title>
        <Button onClick={open} size={"xs"}>
          Add client
        </Button>
      </Group>

      <Stack>
        {!clients.isLoading && !clients.error && clients.list.length === 0 ? (
          <Alert color="indigo" title="Nothing found" variant="light" />
        ) : null}

        <Stack>
          {!clients.isLoading && !clients.error && clients.list.length === 0 ? (
            <Alert color="indigo" title="Nothing found" variant="light" />
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Client ID</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>External ID</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Stack>
      </Stack>

      <Modal
        onClose={() => {
          close();
          setItem(null);
        }}
        opened={opened}
        title={item ? "Edit client" : "Add client"}
      >
        <ClientModalContent initialValues={item} onSubmit={handleSubmit} />
      </Modal>
    </Stack>
  );
};

export const ClientsListPage = observer(ClientsListPageView);
