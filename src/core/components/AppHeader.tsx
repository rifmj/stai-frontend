import { useProjectsList } from "@/modules/projects/hooks";
import { Avatar, Group, Menu, Select, Text, rem } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

export const AppHeader = () => {
  const projects = useProjectsList();
  return (
    <Group justify={"space-between"}>
      <div>stAI</div>
      <Group>
        <Select
          data={projects.list.map((value) => value.project_name)}
          placeholder="Select project"
          size={"xs"}
        />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar color="blue" radius="xl" style={{ cursor: "pointer" }}>
              VP
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings style={{ height: rem(14), width: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessageCircle
                  style={{ height: rem(14), width: rem(14) }}
                />
              }
            >
              Messages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconPhoto style={{ height: rem(14), width: rem(14) }} />
              }
            >
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSearch style={{ height: rem(14), width: rem(14) }} />
              }
              rightSection={
                <Text c="dimmed" size="xs">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={
                <IconArrowsLeftRight
                  style={{ height: rem(14), width: rem(14) }}
                />
              }
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconTrash style={{ height: rem(14), width: rem(14) }} />
              }
              color="red"
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};
