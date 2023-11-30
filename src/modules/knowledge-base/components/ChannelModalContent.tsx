import { ChannelsListItem } from "@/modules/channels/types";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

export interface ChannelForm {
  api_key: string;
  api_secret: string;
  custom_fields: string;
  type: string;
  webhook_url: string;
}

const INITIAL_VALUES: ChannelForm = {
  api_key: "",
  api_secret: "",
  custom_fields: "",
  type: "",
  webhook_url: "",
};

export function ChannelModalContent(properties: {
  initialValues?: ChannelsListItem;
  onSubmit(values: ChannelForm): void;
}) {
  const form = useForm<ChannelForm>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  useEffect(() => {
    if (properties.initialValues) {
      form.setValues({
        ...properties.initialValues,
        custom_fields: properties.initialValues.custom_fields
          ? JSON.stringify(properties.initialValues.custom_fields)
          : "",
      });
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [properties.initialValues]);

  return (
    <form onSubmit={form.onSubmit((values) => properties.onSubmit(values))}>
      <Stack w={"100%"}>
        <Select
          data={[
            {
              label: "WhatsApp",
              value: "WhatsApp",
            },
            {
              label: "Telegram",
              value: "Telegram",
            },
          ]}
          label={"Type"}
          placeholder="Select type"
          {...form.getInputProps("type")}
        />

        <TextInput label="API Key" {...form.getInputProps("api_key")} />

        <TextInput label="API Secret" {...form.getInputProps("api_secret")} />

        <TextInput
          label="Custom fields"
          {...form.getInputProps("custom_fields")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
