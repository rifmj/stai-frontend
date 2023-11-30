import { CreateProject, ProjectsListItem } from "@/modules/channels/types";
import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

const INITIAL_VALUES: CreateProject = {
  description: "",
  project_id: "",
  project_name: "",
};

export function ProjectModalContent(properties: {
  initialValues?: ProjectsListItem;
  onSubmit(values: CreateProject): void;
}) {
  const form = useForm<CreateProject>({
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
        <TextInput label="Name" {...form.getInputProps("project_name")} />

        <Textarea
          autosize
          label="Description"
          maxRows={5}
          minRows={3}
          {...form.getInputProps("description")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
