import { KnowledgeEmbedModalContent } from "@/modules/knowledge-base/components/KnowledgeEmbedModalContent";
import {
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { NavLink as RRNavLink, useParams } from "react-router-dom";

import { useKnowledgeOriginsList } from "../modules/origin/hooks"; // Import the updated hook
import { useMobXStore } from "@/core/store/useMobXStore";
import { useKnowledgeBaseApi } from "@/modules/knowledge-base/api";

import { useKnowledgeOriginApi } from "../modules/origin/api";
import { KnowledgeOriginListItem } from "../modules/origin/types"; // Import the updated API hook

export const KnowledgeOriginListPageView = () => {
  const { projects } = useMobXStore();
  const [knowledgeOriginList, setKnowledgeOriginList] = useState<
    KnowledgeOriginListItem[]
  >([]);
  const [opened, { close, open }] = useDisclosure(false);
  const [selectedKnowledgeOrigin, setSelectedKnowledgeOrigin] =
    useState<KnowledgeOriginListItem | null>(null);

  const projectId = projects.currentProject;

  const { kbId } = useParams();

  const knowledgeOriginsApi = useKnowledgeOriginApi();
  const knowledgeBaseApi = useKnowledgeBaseApi();

  const {
    error,
    isLoading,
    list: knowledgeOriginsData,
    mutate: revalidate,
  } = useKnowledgeOriginsList(projectId, kbId); // Replace with your projectId and kbId

  useEffect(() => {
    if (knowledgeOriginsData) {
      setKnowledgeOriginList(knowledgeOriginsData);
    }
  }, [knowledgeOriginsData]);

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between">
        <Title order={4}>Knowledge Origins</Title>
        <Button onClick={() => open()} size={"xs"}>
          Add origin
        </Button>
      </Group>

      <Stack>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <Alert color="red">{error.message}</Alert>
        ) : knowledgeOriginList.length === 0 ? (
          <Alert
            color="indigo"
            icon={<IconInfoCircle />}
            title="Nothing found"
            variant="light"
          />
        ) : null}

        <SimpleGrid cols={2}>
          {knowledgeOriginList.map((knowledgeOrigin) => (
            <Paper
              key={knowledgeOrigin.knowledge_origin_id}
              p="md"
              shadow="xs"
              withBorder
            >
              <Stack>
                <Stack gap={0}>
                  <Title order={4}>{knowledgeOrigin.name}</Title>
                  <Text size={"sm"}>{knowledgeOrigin.type}</Text>
                  <Text size={"xs"}>{knowledgeOrigin.description}</Text>
                  <Text size={"xs"}>{knowledgeOrigin.attributes?.url}</Text>
                  <Text c={"dimmed"} size={"xs"}>
                    {knowledgeOrigin.knowledge_origin_id}
                  </Text>
                </Stack>
                <Group>
                  <Button
                    component={RRNavLink}
                    size={"xs"}
                    to={`${knowledgeOrigin.knowledge_origin_id}`}
                    variant={"light"}
                  >
                    Open
                  </Button>
                  <Button
                    onClick={() =>
                      knowledgeBaseApi.extract(
                        projectId,
                        kbId,
                        knowledgeOrigin.knowledge_origin_id,
                      )
                    }
                    size={"xs"}
                    variant={"light"}
                  >
                    Embed
                  </Button>
                  {/*<Button onClick={() => open()} size={"xs"} variant={"light"}>*/}
                  {/*  Edit*/}
                  {/*</Button>*/}
                </Group>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>

      <Modal
        onClose={() => {
          close();
          setSelectedKnowledgeOrigin(null);
        }}
        title={
          selectedKnowledgeOrigin
            ? "Edit Knowledge Origin"
            : "Add Knowledge Origin"
        }
        opened={opened}
      >
        <KnowledgeEmbedModalContent
          onSubmit={async (values) => {
            if (values.url) {
              await knowledgeBaseApi.extend(projectId, kbId, {
                attributes: { url: values.url },
                type: "WebPage",
              });
              close();
              await revalidate();
              return;
            }
            if (values.file) {
              console.info("V", values.file);
              await knowledgeBaseApi.upload(projectId, kbId, {
                file: values.file,
                name: values.file.name,
                type: "Pdf",
              });
              close();
              await revalidate();
            }
          }}
          // initialValues={selectedKnowledgeOrigin}
        />
      </Modal>
    </Stack>
  );
};

export const KnowledgeOriginListPage = observer(KnowledgeOriginListPageView);
