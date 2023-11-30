import { KnowledgeListItem } from "@/modules/knowledge-base/modules/knowledge/types";
import { CreateKnowledgeBase } from "@/modules/knowledge-base/types";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

const INITIAL_VALUES: KnowledgeListItem = {
  kb_id: "",
  knowledge_id: "",
  text: "",
};

export function KnowledgeModalContent(properties: {
  initialValues?: KnowledgeListItem;
  onSubmit(values: KnowledgeListItem): void;
}) {
  const form = useForm<KnowledgeListItem>({
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
        <Textarea
          autosize
          label="Text"
          maxRows={12}
          minRows={4}
          {...form.getInputProps("text")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
