import { useMobXStore } from "@/core/store/useMobXStore";
import { useClientsApi } from "@/modules/clients/api";
import { useClientsList } from "@/modules/clients/hooks";
import { UpdateClient } from "@/modules/clients/types";
import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { NavLink as RRNavLink, useParams } from "react-router-dom";

const INITIAL_VALUES: UpdateClientForm = {
  auth_token: null,
  custom_fields: {},
  external_id: null,
  name: "",
  scenario_id: null,
};

export interface UpdateClientForm extends UpdateClient {
  custom_fields: {};
}

export function ClientModalContent(properties: {
  initialValues?: UpdateClient;
  onSubmit(values: UpdateClientForm): void;
}) {
  const form = useForm<UpdateClientForm>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  useEffect(() => {
    if (properties.initialValues) {
      form.setValues({
        ...properties.initialValues,
        custom_fields: JSON.stringify(
          properties.initialValues.custom_fields,
          null,
          2,
        ),
      });
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [properties.initialValues]);

  return (
    <form onSubmit={form.onSubmit((values) => properties.onSubmit(values))}>
      <Stack w={"100%"}>
        <TextInput label="Name" {...form.getInputProps("name")} />

        <Textarea
          autosize
          label="External ID"
          maxRows={3}
          minRows={1}
          {...form.getInputProps("external_id")}
        />

        <Textarea
          autosize
          label="Auth Token"
          maxRows={3}
          minRows={1}
          {...form.getInputProps("auth_token")}
        />

        <Textarea
          autosize
          label="Custom Fields"
          maxRows={8}
          minRows={3}
          {...form.getInputProps("custom_fields")}
        />

        <Textarea
          autosize
          label="Scenario ID"
          maxRows={3}
          minRows={1}
          {...form.getInputProps("scenario_id")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}

export function ClientPlainEditContent(properties: {
  initialValues?: UpdateClient;
  onSubmit(values: UpdateClientForm): void;
}) {
  const { clientId } = useParams();
  const { projects } = useMobXStore();
  const form = useForm<UpdateClientForm>({
    initialValues: INITIAL_VALUES,
    validate: {},
  });

  useEffect(() => {
    if (properties.initialValues) {
      form.setValues({
        ...properties.initialValues,
        custom_fields: properties.initialValues.custom_fields,
      });
    } else {
      form.setValues(INITIAL_VALUES);
    }
  }, [properties.initialValues]);

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <form onSubmit={form.onSubmit((values) => properties.onSubmit(values))}>
      <Stack w={"100%"}>
        <TextInput label="Name" {...form.getInputProps("name")} />

        <TextInput label="Room" {...form.getInputProps("custom_fields.room")} />

        <DateInput
          label="Check-in date"
          placeholder="Check-in date"
          {...form.getInputProps("custom_fields.check_in_date")}
        />

        <DateInput
          label="Check-out date"
          placeholder="Check-out date"
          {...form.getInputProps("custom_fields.check_out_date")}
        />

        {form.getInputProps("auth_token").value ? (
          <TextInput label="Auth token" {...form.getInputProps("auth_token")} />
        ) : null}

        <Group justify="flex-start" mt="md">
          <Button type="submit" variant={"light"}>
            Save
          </Button>
          <Button onClick={open} variant={"outline"}>
            Show QR code
          </Button>
          <Button
            color={"yellow"}
            component={RRNavLink}
            to={"/crm/clients"}
            variant={"outline"}
          >
            Cancel
          </Button>
        </Group>
      </Stack>

      <Modal onClose={close} opened={opened} withCloseButton>
        <QRCode
          value={`https://${window.location.host}/landing/${projects.currentProject}/${clientId}`}
        />
      </Modal>
    </form>
  );
}
