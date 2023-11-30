import logo from "@/assets/logo.svg";
import { useMobXStore } from "@/core/store/useMobXStore";
import { useAuth } from "@/core/user/useAuth";
import { useProjectsList } from "@/modules/projects/hooks";
import { ActionIcon, Avatar, Group, Menu, Select, rem } from "@mantine/core";
import {
  IconAdjustments,
  IconListDetails,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { observer } from "mobx-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const AppHeader = observer(() => {
  const navigate = useNavigate();
  const { config, projects } = useMobXStore();
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
          <ActionIcon
            aria-label="Settings"
            onClick={() => config.setUseDarkMode(!config.useDarkMode)}
            variant="light"
          >
            {config.useDarkMode ? (
              <IconMoon stroke={1.5} style={{ height: "70%", width: "70%" }} />
            ) : (
              <IconSun stroke={1.5} style={{ height: "70%", width: "70%" }} />
            )}
          </ActionIcon>

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

            <Menu.Item
              leftSection={
                <IconListDetails style={{ height: rem(14), width: rem(14) }} />
              }
              component={NavLink}
              to={"/projects"}
            >
              Projects
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
});
