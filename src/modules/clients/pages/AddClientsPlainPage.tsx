import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { ClientPlainEditContent } from "@/modules/clients/components/ClientModalContent";
import { Group, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react";
import React from "react";

export const AddClientPlainPageView = () => {
  const { projects } = useMobXStore();
  const clientsApi = useClientsApi();

  return (
    <Stack gap={"lg"} p={"md"}>
      <Group justify="space-between">
        <Title order={4}>Add guest</Title>
      </Group>

      <ClientPlainEditContent
        onSubmit={(data) => {
          console.info("ddd", data);
        }}
      />
    </Stack>
  );
};

export const AddClientPlainPage = observer(AddClientPlainPageView);
