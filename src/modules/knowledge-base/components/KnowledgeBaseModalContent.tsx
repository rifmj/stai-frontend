import { KnowledgeBaseListItem } from "@/modules/knowledge-base/types";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

const INITIAL_VALUES: KnowledgeBaseListItem = {
  kb_id: "",
  name: "",
  project_id: "",
};

export function KnowledgeBaseModalContent(properties: {
  initialValues?: KnowledgeBaseListItem;
  onSubmit(values: KnowledgeBaseListItem): void;
}) {
  const form = useForm<KnowledgeBaseListItem>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  useEffect(() => {
    if (properties.initialValues) {
      form.setValues({
        ...properties.initialValues,
      });
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [properties.initialValues]);

  return (
    <form onSubmit={form.onSubmit((values) => properties.onSubmit(values))}>
      <Stack w={"100%"}>
        <TextInput label="Name" {...form.getInputProps("name")} />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
