import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { ClientPlainEditContent } from "@/modules/clients/components/ClientModalContent";
import { useClientsList } from "@/modules/clients/hooks";
import { Group, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import React from "react";

export const AddClientPlainPageView = () => {
  const { projects } = useMobXStore();
  const clientsApi = useClientsApi();

  const clients = useClientsList(projects.currentProject);

  return (
    <Stack gap={"lg"} p={"md"}>
      <Group justify="space-between">
        <Title order={4}>Add guest</Title>
      </Group>

      <ClientPlainEditContent
        onSubmit={async (data) => {
          await clientsApi.create(projects.currentProject, {
            auth_token: nanoid(32),
            custom_fields: data.custom_fields,
            external_id: null,
            name: data.name,
            scenario_id: null,
          });
          await clients.mutate();
        }}
      />
    </Stack>
  );
};

export const AddClientPlainPage = observer(AddClientPlainPageView);
