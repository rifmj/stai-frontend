import { useMobXStore } from "@/core/store/useMobXStore";
import { useFunctionsApi } from "@/modules/functions/api";
import { FunctionModalContent } from "@/modules/functions/components/FunctionModalContent";
import { useFunctionsList } from "@/modules/functions/hooks";
import { FunctionsListItem } from "@/modules/functions/types";
import {
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const FunctionsListPageView = () => {
  const { projects } = useMobXStore();
  const functionsApi = useFunctionsApi();
  const functions = useFunctionsList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<FunctionsListItem>(null);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Functions</Title>
        <Button onClick={open} size={"xs"}>
          Add function
        </Button>
      </Group>

      <Stack>
        {!functions.isLoading &&
        !functions.error &&
        functions.list.length === 0 ? (
          <Alert
            color="indigo"
            icon={<IconInfoCircle />}
            title="Nothing found"
            variant="light"
          />
        ) : null}
        {functions.list.map((value) => (
          <Paper key={value.function_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack gap={"xs"}>
                <Title order={4}>{value.name}</Title>
                <Text size={"sm"}>{value.description}</Text>
              </Stack>
              <Group>
                <Button
                  onClick={() => {
                    setItem(value);
                    open();
                  }}
                  color={"teal"}
                  rightSection={<IconPencil size={14} />}
                  size={"xs"}
                  variant={"light"}
                >
                  Edit
                </Button>

                <Button
                  onClick={async () => {
                    await functionsApi.delete(
                      projects.currentProject,
                      item.function_id,
                    );
                    await functions.mutate();
                  }}
                  color={"red"}
                  rightSection={<IconTrash size={14} />}
                  size={"xs"}
                  variant={"light"}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Modal
        onClose={() => {
          close();
          setItem(null);
        }}
        opened={opened}
        title={item ? "Edit function" : "Add function"}
      >
        <FunctionModalContent
          onSubmit={async (values) => {
            const data = cloneDeep(values);
            const final: FunctionsListItem = {
              ...data,
              function_data: JSON.parse(data["function_data"]),
              parameters: JSON.parse(data["parameters"]),
            };
            await (item
              ? functionsApi.create(projects.currentProject, final)
              : functionsApi.update(
                  projects.currentProject,
                  item.function_id,
                  final,
                ));
            setItem(null);
            close();
          }}
          initialValues={item}
        />
      </Modal>
    </Stack>
  );
};

export const FunctionsListPage = observer(FunctionsListPageView);
