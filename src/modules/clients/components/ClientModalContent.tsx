import { UpdateClient } from "@/modules/clients/types";
import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

const INITIAL_VALUES: UpdateClientForm = {
  auth_token: null,
  custom_fields: "",
  external_id: null,
  name: "",
  scenario_id: null,
};

export interface UpdateClientForm extends UpdateClient {
  custom_fields: string; // Represent custom fields as string for JsonInput
}

export function ClientModalContent(properties: {
  initialValues?: UpdateClient;
  onSubmit(values: UpdateClientForm): void;
}) {
  const form = useForm<UpdateClientForm>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  useEffect(() => {
    if (properties.initialValues) {
      form.setValues({
        ...properties.initialValues,
        custom_fields: JSON.stringify(
          properties.initialValues.custom_fields,
          null,
          2,
        ),
      });
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [properties.initialValues]);

  return (
    <form onSubmit={form.onSubmit((values) => properties.onSubmit(values))}>
      <Stack w={"100%"}>
        <TextInput label="Name" {...form.getInputProps("name")} />

        <Textarea
          autosize
          label="External ID"
          maxRows={3}
          minRows={1}
          {...form.getInputProps("external_id")}
        />

        <Textarea
          autosize
          label="Auth Token"
          maxRows={3}
          minRows={1}
          {...form.getInputProps("auth_token")}
        />

        <Textarea
          autosize
          label="Custom Fields"
          maxRows={8}
          minRows={3}
          {...form.getInputProps("custom_fields")}
        />

        <Textarea
          autosize
          label="Scenario ID"
          maxRows={3}
          minRows={1}
          {...form.getInputProps("scenario_id")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
