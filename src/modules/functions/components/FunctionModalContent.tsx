import { UpdateFunction } from "@/modules/functions/types";
import {
  Button,
  Group,
  JsonInput,
  SegmentedControl,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

const INITIAL_VALUES: UpdateFunctionForm = {
  description: "",
  documentation: "",
  examples: [],
  function_data: "",
  function_type: "",
  name: "",
  parameters: "",
};

type ExcludedData = Omit<UpdateFunction, "function_data" | "parameters">;

export interface UpdateFunctionForm extends ExcludedData {
  function_data: string;
  parameters: string;
}

export function FunctionModalContent(properties: {
  initialValues?: UpdateFunction;
  isGenerated?: boolean;
  onSubmit(values: UpdateFunctionForm): void;
}) {
  const form = useForm<UpdateFunctionForm>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  useEffect(() => {
    if (properties.initialValues) {
      form.setValues({
        ...properties.initialValues,
        function_data: JSON.stringify(
          properties.initialValues.function_data,
          null,
          2,
        ),
        parameters: JSON.stringify(
          properties.initialValues.parameters,
          null,
          2,
        ),
        ...(properties.isGenerated && {
          function_type: "API_CALL",
        }),
      });
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [properties.initialValues]);

  return (
    <form onSubmit={form.onSubmit((values) => properties.onSubmit(values))}>
      <Stack w={"100%"}>
        {properties.isGenerated ? null : (
          <SegmentedControl
            data={[
              { label: "API call", value: "API_CALL" },
              { label: "AI call", value: "AI_CALL" },
              { label: "Get knowledge", value: "GET_KNOWLEDGE" },
              { label: "Change field", value: "CHANGE_CLIENT_FIELD" },
              { label: "Get field", value: "GET_CLIENT_FIELD" },
            ]}
            {...form.getInputProps("function_type")}
          />
        )}

        <TextInput label="Name" {...form.getInputProps("name")} />

        <Textarea
          autosize
          label="Description"
          maxRows={8}
          minRows={3}
          {...form.getInputProps("description")}
        />
        <JsonInput
          autosize
          label="Function Data"
          maxRows={8}
          minRows={3}
          {...form.getInputProps("function_data")}
        />
        <JsonInput
          autosize
          label="Parameters"
          maxRows={8}
          minRows={3}
          {...form.getInputProps("parameters")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
