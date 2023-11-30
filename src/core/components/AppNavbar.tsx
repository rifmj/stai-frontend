import { NavLink, Stack } from "@mantine/core";
import {
  IconBrain,
  IconMathFunction,
  IconMessages,
  IconPlugConnected,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";

export const AppNavbar = () => {
  return (
    <Stack gap={0}>
      <NavLink
        active
        label="Channels"
        leftSection={<IconPlugConnected size="1rem" stroke={1.5} />}
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
