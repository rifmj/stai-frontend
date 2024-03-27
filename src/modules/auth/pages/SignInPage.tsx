import { useAuth } from "@/core/user/useAuth";
import {
  Alert,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  Stack,
  TextInput,
  Title,
  Transition,
  em,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/logo.svg";

export const SignInPage = (properties?: { target?: "crm" }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? undefined : "Invalid email"),
    },
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const onSubmit = async (email: string, password: string) => {
    console.info("Try to auth", email, password);
    setLoading(true);
    setError(false);
    try {
      console.info("Make request");
      const result = await auth.signIn(email, password);
      console.info("Make request:result", result);
      if (result) {
        if (properties.target === "crm") {
          navigate("/crm/clients");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.info("Login:error", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center h={"100vh"}>
      <Stack align={"center"}>
        <img height={32} src={logo} />
        <form
          onSubmit={form.onSubmit((values) =>
            onSubmit(values.email, values.password),
          )}
        >
          <Stack w={320}>
            <TextInput
              disabled={isLoading}
              label="Email"
              placeholder="your@email.com"
              withAsterisk
              {...form.getInputProps("email")}
            />

            <TextInput
              disabled={isLoading}
              label="Password"
              placeholder="******"
              withAsterisk
              {...form.getInputProps("password")}
            />

            <Transition
              duration={700}
              mounted={isError}
              timingFunction="ease"
              transition="fade"
            >
              {(styles) => (
                <div style={styles}>
                  <Alert
                    color="red"
                    icon={<IconAlertCircle />}
                    title="Something went wrong"
                    variant="light"
                    w={"100%"}
                  />
                </div>
              )}
            </Transition>

            <Group justify="flex-end" mt="md">
              <Button loading={isLoading} type="submit">
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};
