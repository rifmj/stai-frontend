import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { ClientPlainEditContent } from "@/modules/clients/components/ClientModalContent";
import { useClientsList } from "@/modules/clients/hooks";
import { Group, Stack, Title } from "@mantine/core";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditClientPlainPageView = () => {
  const { projects } = useMobXStore();
  const clientsApi = useClientsApi();

  const clients = useClientsList(projects.currentProject);

  const navigate = useNavigate();

  const { clientId } = useParams();

  const client = useMemo(() => {
    const clientDataOriginal = clients.list.find(
      (value) => value.client_id === clientId,
    );
    const clientData = cloneDeep(clientDataOriginal);
    if (!clientData) {
      return;
    }
    if (typeof clientData.custom_fields === "string") {
      clientData.custom_fields = {};
    }
    if (typeof clientData.custom_fields?.check_in_date === "string") {
      clientData.custom_fields.check_in_date = new Date(
        clientData.custom_fields.check_in_date,
      );
    }
    if (typeof clientData.custom_fields?.check_out_date === "string") {
      clientData.custom_fields.check_out_date = new Date(
        clientData.custom_fields.check_out_date,
      );
    }
    return clientData;
  }, [clients.list, clientId]);

  console.info("ccc", client);

  return (
    <Stack gap={"lg"} p={"md"}>
      <Group justify="space-between">
        <Title order={4}>Edit guest</Title>
      </Group>

      {client ? (
        <ClientPlainEditContent
          onSubmit={async (data) => {
            console.info("ddd", data);
            await clientsApi.update(projects.currentProject, client.client_id, {
              custom_fields: {
                ...client.custom_fields,
                ...data.custom_fields,
              },
            });
            await clients.mutate();
            navigate(`/crm/clients`);
          }}
          initialValues={client}
        />
      ) : null}
    </Stack>
  );
};

export const EditClientPlainPage = observer(EditClientPlainPageView);
