import logo from "@/assets/logo.svg";
import { useMobXStore } from "@/core/store/useMobXStore";
import { useAuth } from "@/core/user/useAuth";
import { useProjectsList } from "@/modules/projects/hooks";
import { Avatar, Group, Menu, Select, Text, rem } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconLogout,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AppHeader = () => {
  const navigate = useNavigate();
  const { projects } = useMobXStore();
  const { signOut } = useAuth();
  const projectsList = useProjectsList();
  console.info("current project", projects.currentProject);
  return (
    <Group justify={"space-between"}>
      <img height={16} src={logo} />
      <Group>
        <Select
          data={projectsList.list.map((value) => ({
            label: value.project_name,
            value: value.project_id,
          }))}
          onChange={(value) => {
            projects.setCurrentProject(value);
            console.info("value", value);
          }}
          placeholder="Select project"
          size={"xs"}
          value={projects.currentProject}
        />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar color="green" radius="xl" style={{ cursor: "pointer" }}>
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

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={
                <IconLogout style={{ height: rem(14), width: rem(14) }} />
              }
              onClick={() => {
                signOut();
                navigate("/sign-in");
              }}
              color="red"
            >
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};
