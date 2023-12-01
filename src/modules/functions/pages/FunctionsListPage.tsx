import { useMobXStore } from "@/core/store/useMobXStore";
import { useFunctionsApi } from "@/modules/functions/api";
import {
  FunctionModalContent,
  UpdateFunctionForm,
} from "@/modules/functions/components/FunctionModalContent";
import { useFunctionsList } from "@/modules/functions/hooks";
import { CreateFunction, FunctionsListItem } from "@/modules/functions/types";
import { wait } from "@/sdk/utils/wait";
import {
  Alert,
  Button,
  Center,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { Spotlight, spotlight } from "@mantine/spotlight";
import {
  IconInfoCircle,
  IconPencil,
  IconSearch,
  IconTrash,
  IconWand,
} from "@tabler/icons-react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import React, { useState } from "react";

export const FunctionsListPageView = () => {
  const { projects } = useMobXStore();
  const functionsApi = useFunctionsApi();
  const functions = useFunctionsList(projects.currentProject);
  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<FunctionsListItem>(null);

  const [functionDefinition, setFunctionDefinitio] = useState("");
  const [generatedFunction, setGeneratedFunction] =
    useState<CreateFunction>(null);

  const handleSubmit = async (values: UpdateFunctionForm) => {
    const data = cloneDeep(values);
    const final: CreateFunction = {
      ...data,
      function_data: JSON.parse(data["function_data"]),
      parameters: JSON.parse(data["parameters"]),
    };
    await (item
      ? functionsApi.update(projects.currentProject, item.function_id, final)
      : functionsApi.create(projects.currentProject, final));
    setItem(null);
    setGeneratedFunction(null);
    await functions.mutate();
    modals.closeAll();
    spotlight.close();
    close();
  };

  const defaultSpotlightActions = [
    {
      description: "Click to generate your function",
      id: "generate",
      label: "Generate",
      leftSection: (
        <IconWand stroke={1.5} style={{ height: rem(20), width: rem(20) }} />
      ),
      onClick: async () => {
        modals.open({
          children: (
            <Center>
              <Stack align={"center"} justify={"center"}>
                <Loader color={"blue"} />
                <Text>Please wait while AI processing your request...</Text>
              </Stack>
            </Center>
          ),
          closeOnClickOutside: false,
          closeOnEscape: false,
          id: "loading",
          title: "Loading",
          withCloseButton: false,
          zIndex: 9999,
        });
        try {
          const response = await functionsApi.generate(
            projects.currentProject,
            functionDefinition,
          );
          const generated = {
            description: response.description,
            function_data: response.function_data,
            function_type: "API_CALL",
            name: response.name,
            parameters: response.parameters,
          };
          setGeneratedFunction(generated);
          modals.open({
            children: (
              <>
                <FunctionModalContent
                  initialValues={generated}
                  isGenerated
                  onSubmit={handleSubmit}
                />
              </>
            ),
            onClose() {
              modals.closeAll();
              setGeneratedFunction(null);
            },
            title: "Your generated function",
            zIndex: 9999,
          });
        } catch {
          modals.closeAll();
        } finally {
        }
      },
    },
  ];

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Functions</Title>
        <Group>
          <Button
            onClick={() => spotlight.open()}
            rightSection={<IconWand size={14} />}
            size={"xs"}
            variant={"light"}
          >
            Generate function
          </Button>
          <Button onClick={open} size={"xs"}>
            Add function
          </Button>
        </Group>
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
                <Text c={"dimmed"} size={"xs"}>
                  {value.function_type}
                </Text>
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
        <FunctionModalContent initialValues={item} onSubmit={handleSubmit} />
      </Modal>

      <Spotlight
        searchProps={{
          leftSection: (
            <IconSearch
              stroke={1.5}
              style={{ height: rem(20), width: rem(20) }}
            />
          ),
          placeholder: "Enter your function definition...",
        }}
        actions={defaultSpotlightActions}
        closeOnActionTrigger={false}
        filter={() => defaultSpotlightActions}
        highlightQuery
        limit={7}
        onQueryChange={(query) => setFunctionDefinitio(query)}
        query={functionDefinition}
        zIndex={999}
      />
    </Stack>
  );
};

export const FunctionsListPage = observer(FunctionsListPageView);
