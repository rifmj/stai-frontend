import { NavLink, Stack } from "@mantine/core";
import {
  IconBrain,
  IconChartAreaLineFilled,
  IconMathFunction,
  IconMessages,
  IconPlugConnected,
  IconSettings,
} from "@tabler/icons-react";
import cx from "clsx";
import React from "react";
import {
  NavLink as RRNavLink,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export const AppNavbar = () => {
  const navigate = useNavigate();
  const s = useNavigation();
  return (
    <Stack gap={0}>
      <NavLink
        active={window.location.pathname === "/channels"}
        component={RRNavLink}
        label="Channels"
        leftSection={<IconPlugConnected size="1rem" stroke={1.5} />}
        to={"/channels"}
      />

      <NavLink
        active={window.location.pathname === "/functions"}
        component={RRNavLink}
        label="Functions"
        leftSection={<IconMathFunction size="1rem" stroke={1.5} />}
        to={"/functions"}
      />
      <NavLink
        active={window.location.pathname.startsWith("/chats")}
        component={RRNavLink}
        label="Chats"
        leftSection={<IconMessages size="1rem" stroke={1.5} />}
        to={"/chats"}
      />
      <NavLink
        active={window.location.pathname.startsWith("/kb")}
        component={RRNavLink}
        label="Knowledge base"
        leftSection={<IconBrain size="1rem" stroke={1.5} />}
        to={"/kb"}
      />
      <NavLink
        active={window.location.pathname === "/statistics"}
        component={RRNavLink}
        label="Statistics"
        leftSection={<IconChartAreaLineFilled size="1rem" stroke={1.5} />}
        to={"/settings"}
      />
      <NavLink
        active={window.location.pathname === "/settings"}
        component={RRNavLink}
        label="Settings"
        leftSection={<IconSettings size="1rem" stroke={1.5} />}
        to={"/settings"}
      />
    </Stack>
  );
};
