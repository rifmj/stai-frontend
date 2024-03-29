import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatsList } from "@/modules/chats/hooks";
import {
  Alert,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconPencil,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { observer } from "mobx-react";
import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";

export const ChatsListPageView = () => {
  const { projects } = useMobXStore();
  const chats = useChatsList(projects.currentProject);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Chats</Title>
        <Button
          onClick={() => chats.mutate()}
          rightSection={<IconRefresh size={14} />}
          size={"xs"}
          variant={"light"}
        >
          Refresh
        </Button>
      </Group>

      {chats.list.length === 0 ? (
        <Alert
          color="indigo"
          icon={<IconInfoCircle />}
          title="Nothing found"
          variant="light"
        />
      ) : null}

      <SimpleGrid cols={3}>
        {chats.list.map((value) => (
          <Paper key={value.chat_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack>
                <Stack gap={4}>
                  <Text size={"md"}>
                    {value.client.name} (
                    {value.client.custom_fields?.first_name ?? ""})
                  </Text>
                  <Text size={"xs"}>{value.client_id}</Text>
                </Stack>
                <Group>
                  <Button
                    component={RRNavLink}
                    size={"xs"}
                    to={`${value.chat_id}`}
                    variant={"light"}
                  >
                    Open
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export const ChatsListPage = observer(ChatsListPageView);
