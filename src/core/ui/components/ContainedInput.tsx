import { TextInput, TextInputProps } from "@mantine/core";

import classes from "./ContainedInput.module.css";

export function ContainedInput(properties: TextInputProps) {
  return <TextInput classNames={classes} {...properties} />;
}
