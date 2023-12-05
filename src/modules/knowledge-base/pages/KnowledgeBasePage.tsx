import { useMobXStore } from "@/core/store/useMobXStore";
import { useKnowledgeBaseApi } from "@/modules/knowledge-base/api";
import { KnowledgeEmbedModalContent } from "@/modules/knowledge-base/components/KnowledgeEmbedModalContent";
import { KnowledgeModalContent } from "@/modules/knowledge-base/components/KnowledgeModalContent";
import { useKnowledgeBaseList } from "@/modules/knowledge-base/hooks";
import { useKnowledgeApi } from "@/modules/knowledge-base/modules/knowledge/api";
import { useKnowledgeList } from "@/modules/knowledge-base/modules/knowledge/hooks";
import { KnowledgeListItem } from "@/modules/knowledge-base/modules/knowledge/types";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { Spotlight, spotlight } from "@mantine/spotlight";
import {
  IconFiles,
  IconInputX,
  IconLibrary,
  IconNetwork,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { debounce } from "lodash";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavLink as RRNavLink, useParams } from "react-router-dom";
import useSWR from "swr";

export const KnowledgeBasePage = () => {
  const { projects } = useMobXStore();
  const knowledgeApi = useKnowledgeApi();
  const knowledgeBaseApi = useKnowledgeBaseApi();

  const { kbId } = useParams();

  const knowledgeBaseList = useKnowledgeBaseList(projects.currentProject);
  const knowledge = useKnowledgeList(projects.currentProject, kbId);

  const base = useMemo(() => {
    return knowledgeBaseList.list.find((value) => value.kb_id === kbId);
  }, [knowledgeBaseList, kbId]);

  const [opened, { close, open }] = useDisclosure(false);
  const [item, setItem] = useState<KnowledgeListItem>(null);

  const breadcrumbs = [
    { href: "/kb", title: "Knowledge base" },
    {
      href: "",
      title: base?.name,
    },
  ].map((item, index) => (
    <Anchor component={RRNavLink} key={index} to={item.href}>
      {item.title}
    </Anchor>
  ));

  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");

  const searchResult = useSWR(`search:${currentQuery}`, () =>
    searchQuery
      ? knowledgeBaseApi.search(projects.currentProject, kbId, searchQuery)
      : null,
  );

  console.info("sdfsd", searchResult.data);

  let queryReference = useRef("");

  const functionToDebounce = useCallback((query: string) => {
    console.info("e1", queryReference, query);
    setCurrentQuery(query);
  }, []);

  const setQueryDebounced = useCallback(
    debounce(functionToDebounce, 1200, {
      leading: false,
      trailing: true,
    }),
    [],
  );

  useEffect(() => {
    if (searchQuery) {
      queryReference.current = searchQuery;
      setQueryDebounced(searchQuery);
    }
  }, [searchQuery, setQueryDebounced]);

  const actions = currentQuery
    ? searchResult?.data?.map((value) => ({
        description: value.text,
        id: value.knowledge_id,
        label: value.knowledge_id,
      })) ?? []
    : [];

  const openModal = (knowledgeId: string) =>
    modals.openConfirmModal({
      labels: { cancel: "Cancel", confirm: "Confirm" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        await knowledgeApi.delete(projects.currentProject, kbId, knowledgeId);
        await knowledge.mutate();
      },
      title: "Please confirm delete",
    });

  return (
    <Stack gap={"lg"}>
      <Breadcrumbs mt="xs" separator="→">
        {breadcrumbs}
      </Breadcrumbs>

      <Group justify="space-between">
        <Title order={4}>{base?.name}</Title>
        <Group>
          <Button
            leftSection={
              <IconSearch style={{ height: rem(14), width: rem(14) }} />
            }
            onClick={() => spotlight.open()}
            size={"xs"}
            variant={"light"}
          >
            Search
          </Button>
          <Button
            leftSection={
              <IconLibrary style={{ height: rem(14), width: rem(14) }} />
            }
            component={RRNavLink}
            size={"xs"}
            to={"origins"}
            variant={"light"}
          >
            Origins
          </Button>
          <Button
            leftSection={
              <IconPlus style={{ height: rem(14), width: rem(14) }} />
            }
            onClick={open}
            size={"xs"}
          >
            Add knowledge
          </Button>
        </Group>
      </Group>

      <Stack>
        {knowledge.list.map((value) => (
          <Paper key={value.kb_id} p="md" shadow="xs" withBorder>
            <Stack>
              <Stack gap={0}>
                <Text size={"md"}>{value.text}</Text>
              </Stack>
              <Group>
                <Button
                  onClick={() => {
                    setItem(value);
                    open();
                  }}
                  color={"teal"}
                  rightSection={<IconPencil size={14} />}
                  size={"xs"}
                  variant={"light"}
                >
                  Edit
                </Button>

                <Button
                  onClick={async () => {
                    await openModal(value.knowledge_id);
                  }}
                  color={"red"}
                  rightSection={<IconTrash size={14} />}
                  size={"xs"}
                  variant={"light"}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Modal
        onClose={() => {
          close();
          setItem(null);
        }}
        opened={opened}
        title={item ? "Edit knowledge" : "Add knowledge"}
      >
        <KnowledgeModalContent
          onSubmit={async (values) => {
            await (item
              ? knowledgeApi.update(
                  projects.currentProject,
                  item.kb_id,
                  item.knowledge_id,
                  values,
                )
              : knowledgeApi.create(projects.currentProject, kbId, values));
            await knowledge.mutate();
            setItem(null);
            close();
          }}
          initialValues={item}
        />
      </Modal>

      <Spotlight
        searchProps={{
          leftSection: (
            <IconSearch
              stroke={1.5}
              style={{ height: rem(20), width: rem(20) }}
            />
          ),
          placeholder: "Search...",
        }}
        actions={actions}
        closeOnActionTrigger={false}
        highlightQuery
        limit={7}
        nothingFound={currentQuery ? "Nothing found" : "Enter your query"}
        onQueryChange={(query) => setSearchQuery(query)}
        query={searchQuery}
      />
    </Stack>
  );
};
