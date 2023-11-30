import { NavLink, Stack } from "@mantine/core";
import {
  IconBrain,
  IconMathFunction,
  IconMessages,
  IconPlugConnected,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AppNavbar = () => {
  const navigate = useNavigate();
  return (
    <Stack gap={0}>
      <NavLink
        active
        label="Channels"
        leftSection={<IconPlugConnected size="1rem" stroke={1.5} />}
        onClick={() => navigate("/channels")}
      />

      <NavLink
        label="Functions"
        leftSection={<IconMathFunction size="1rem" stroke={1.5} />}
      />
      <NavLink
        label="Chats"
        leftSection={<IconMessages size="1rem" stroke={1.5} />}
      />
      <NavLink
        label="Knowledge base"
        leftSection={<IconBrain size="1rem" stroke={1.5} />}
      />
      <NavLink
        label="Settings"
        leftSection={<IconSettings size="1rem" stroke={1.5} />}
      />
    </Stack>
  );
};
