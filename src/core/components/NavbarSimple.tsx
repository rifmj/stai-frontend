import logo from "@/assets/logo.svg";
import { Code, Group } from "@mantine/core";
import React from "react";

import classes from "./NavbarSimple.module.css";

export function NavbarSimple(properties: { children: any }) {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <img height={16} src={logo} />
          <Code fw={700}>v0.1.0</Code>
        </Group>
        {properties.children}
      </div>
    </nav>
  );
}
