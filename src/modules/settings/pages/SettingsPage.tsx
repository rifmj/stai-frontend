import { useMobXStore } from "@/core/store/useMobXStore";
import { useSettingsApi } from "@/modules/settings/api";
import { useModelsSettings, useSettings } from "@/modules/settings/hooks";
import { SettingsItem } from "@/modules/settings/types";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  Switch,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { observer } from "mobx-react";
import React, { useEffect } from "react";

const INITIAL_VALUES: SettingsItem = {
  max_tokens: 0,
  model: "",
  prompt: "",
  use_voice_generation: false,
  use_voice_recognition: false,
};

export const SettingsPageView = () => {
  const { projects } = useMobXStore();
  const settingsApi = useSettingsApi();

  const settings = useSettings(projects.currentProject);
  const modelsSettings = useModelsSettings(projects.currentProject);

  const form = useForm<SettingsItem>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  const [isLoading, { close: disableLoading, open: enableLoading }] =
    useDisclosure(false);

  useEffect(() => {
    if (settings.item) {
      form.setValues(settings.item);
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [settings.item]);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Settings</Title>
      </Group>

      <Box pos="relative">
        <LoadingOverlay
          overlayProps={{ blur: 2, radius: "sm" }}
          visible={isLoading || settings.isLoading}
          zIndex={1000}
        />
        <form
          onSubmit={form.onSubmit(async (values) => {
            enableLoading();
            try {
              await settingsApi.update(projects.currentProject, {
                ...values,
                max_tokens: Number.parseInt(
                  values.max_tokens as unknown as string,
                ),
              });
              notifications.show({
                color: "teal",
                message: "Settings updated",
                title: "Success! ✅",
              });
            } catch {
              notifications.show({
                color: "red",
                message: "Something went wrong",
                title: "Oh! 🤥",
              });
            } finally {
              disableLoading();
            }
          })}
        >
          <Stack w={"100%"}>
            <Select
              data={modelsSettings.list.map((value) => value.id)}
              label={"Model"}
              placeholder="Select model"
              {...form.getInputProps("model")}
            />

            <Switch
              checked={form.values.use_voice_recognition}
              label="Use voice recognition"
            />

            <Switch
              onChange={(event) =>
                form.setFieldValue(
                  "use_voice_generation",
                  event.currentTarget.checked,
                )
              }
              checked={form.values.use_voice_generation}
              label="Use voice generation"
              {...form.getInputProps("use_voice_generation")}
            />

            <TextInput
              label="Max tokens"
              {...form.getInputProps("max_tokens")}
            />

            <Textarea
              autosize
              label="Prompt"
              maxRows={12}
              minRows={4}
              {...form.getInputProps("prompt")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" variant={"light"}>
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export const SettingsPage = observer(SettingsPageView);
