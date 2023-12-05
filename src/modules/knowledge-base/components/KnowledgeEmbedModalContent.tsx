import {
  Box,
  Button,
  CloseButton,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Transition,
  rem,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconFileImport, IconUpload, IconX } from "@tabler/icons-react";
import prettyBytes from "pretty-bytes";
import React, { useState } from "react";

import { useKnowledgeEmbed } from "../hooks/useKnowledgeEmbedModal"; // Import the custom hook

export function KnowledgeEmbedModalContent(properties: {
  onSubmit(data: { file?: any; url?: string }): void;
}) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const { error, isLoading, upload } = useKnowledgeEmbed(); // Use the custom hook

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleEmbedClick = async () => {
    properties.onSubmit({ file, url });
  };

  console.info("xda", file);

  return (
    <Stack p={"sm"}>
      <Transition
        duration={400}
        mounted={Boolean(file)}
        timingFunction="ease"
        transition="fade"
      >
        {(styles) => (
          <Paper p={"xs"} shadow={"md"} style={styles}>
            <Group>
              <Stack gap={0} justify={"center"} style={{ flex: 1 }}>
                <Text fw={"bold"} size={"sm"}>
                  {file?.name}
                </Text>
                <Text c={"dimmer"} size={"xs"}>
                  {file?.size ? prettyBytes(file.size) : 0}
                </Text>
              </Stack>
              <CloseButton onClick={() => setFile(null)} />
            </Group>
          </Paper>
        )}
      </Transition>
      <Transition
        duration={400}
        mounted={!Boolean(file)}
        timingFunction="ease"
        transition="fade"
      >
        {(styles) => (
          <Box style={styles}>
            <Dropzone
              maxSize={20 * 1024 ** 2}
              multiple={false}
              onDrop={(files) => handleDrop(files)}
              onReject={(files) => console.log("rejected files", files)}
            >
              <Group
                gap="md"
                justify="center"
                mih={220}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      color: "var(--mantine-color-blue-6)",
                      height: rem(52),
                      width: rem(52),
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      color: "var(--mantine-color-red-6)",
                      height: rem(52),
                      width: rem(52),
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconFileImport
                    style={{
                      color: "var(--mantine-color-dimmed)",
                      height: rem(52),
                      width: rem(52),
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text inline size="xl">
                    Drag files here or click to select
                  </Text>
                  <Text c="dimmed" inline mt={7} size="sm">
                    File should not exceed 20mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Box>
        )}
      </Transition>
      <TextInput
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Or Enter URL"
        value={url}
      />
      {error && <Text color="red">{error}</Text>}
      <Group align={"flex-end"} justify={"flex-end"}>
        <Button onClick={handleEmbedClick}>Submit</Button>
      </Group>
    </Stack>
  );
}
