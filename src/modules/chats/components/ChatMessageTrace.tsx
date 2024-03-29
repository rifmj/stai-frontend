import { useMobXStore } from "@/core/store/useMobXStore";
import { useChatMessageTrace } from "@/modules/chats/hooks";
import { buildSpansTree } from "@/modules/chats/utils";
import {
  Badge,
  Box,
  Divider,
  Group,
  Mark,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconClockFilled,
  IconPentagon,
  IconPentagonFilled,
  IconTimeDuration0,
  IconTimeline,
} from "@tabler/icons-react";
// Import charts, all with Chart suffix
import {
  // LineChart,
  BarChart,
  PieChart,
  SunburstChart,
  TreeChart,
  TreemapChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from "echarts/charts";
import {
  // TransformComponent,
  DatasetComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // GridSimpleComponent,
  GridComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
import React, { useCallback } from "react";
import { JSONTree } from "react-json-tree";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  TreemapChart,
  SunburstChart,
  TreeChart,
  CanvasRenderer,
  PieChart,
]);

const filterKeys = (value) => !["duration", "end", "start"].includes(value);

const getMarkColor = (duration: number) => {
  if (duration >= 2000) {
    return "red";
  }
  if (duration >= 1500) {
    return "orange";
  }
  if (duration >= 1000) {
    return "yellow";
  }
  return "green";
};

export const ChatMessageTrace = (properties: {
  chatId: string;
  messageId: string;
}) => {
  const { projects } = useMobXStore();
  const trace = useChatMessageTrace(
    projects.currentProject,
    properties.chatId,
    properties.messageId,
  );
  const spans = trace.list.flatMap((value, index, array) => {
    const firstItem = array[0];
    const firstStart = firstItem.attributes.start;
    const previousStart = array[index - 1] ?? array[0];
    const delta = value.attributes.start - previousStart.attributes.start;
    return [
      {
        data: value.attributes,
        delta,
        duration: value.attributes.end
          ? value.attributes.end - value.attributes.start
          : 0,
        end: value.attributes.end,
        end_relative: value.attributes.end - firstStart,
        id: value.span_id,
        start: value.attributes.start,
        start_relative: value.attributes.start - firstItem.attributes.start,
        type: value.name,
      },
    ];
  });

  const tree = buildSpansTree(trace.list);

  console.info("12", spans, buildSpansTree(trace.list));

  const renderRow = (key: string, value: string) => (
    <Text size={"xs"}>
      <strong>{key}: </strong>
      {value}
    </Text>
  );

  const renderRowIfExists = (key: string, value: string) => {
    return value ? renderRow(key, value) : null;
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function getLevelOption() {
    return [
      {
        itemStyle: {
          borderWidth: 0,
          gapWidth: 5,
        },
      },
      {
        itemStyle: {
          gapWidth: 1,
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderColorSaturation: 0.6,
          gapWidth: 1,
        },
      },
    ];
  }

  return (
    <Stack>
      <Tabs defaultValue="overall">
        <Tabs.List>
          <Tabs.Tab value="overall">Overall</Tabs.Tab>
          <Tabs.Tab value="charts">Charts</Tabs.Tab>
          <Tabs.Tab value="raw">Raw</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt={12} value="charts">
          <Box>
            <Box h={320} w={480}>
              <ReactEChartsCore
                option={{
                  series: [
                    {
                      center: ["40%", "50%"],
                      data: tree,
                      emphasis: {
                        itemStyle: {
                          shadowBlur: 10,
                          shadowColor: "rgba(0, 0, 0, 0.5)",
                          shadowOffsetX: 0,
                        },
                      },
                      radius: "55%",
                      type: "pie",
                    },
                  ],
                  tooltip: {
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    trigger: "item",
                  },
                }}
                echarts={echarts}
                lazyUpdate={true}
                notMerge={true}
              />
            </Box>

            <ReactEChartsCore
              option={{
                grid: { left: "33%" },
                series: [
                  {
                    data: spans.map((value) => value.start_relative.toFixed(2)),
                    emphasis: {
                      itemStyle: {
                        borderColor: "transparent",
                        color: "transparent",
                      },
                    },
                    itemStyle: {
                      borderColor: "transparent",
                      color: "transparent",
                    },
                    stack: "Total",
                    type: "bar",
                  },
                  {
                    data: spans.map((value) => value.end_relative.toFixed(2)),
                    stack: "Total",
                    type: "bar",
                  },
                ],
                tooltip: {
                  axisPointer: {
                    type: "shadow",
                  },
                  formatter: (value) =>
                    `<strong>${value[1].name}</strong>` +
                    "<br/>" +
                    `${value[1].value} ms`,
                  trigger: "axis",
                },
                xAxis: {
                  type: "value",
                },
                yAxis: {
                  data: spans.map((value) => value.type),
                  type: "category",
                },
              }}
              echarts={echarts}
              lazyUpdate={true}
              notMerge={true}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel pt={12} value="overall">
          <Stack gap={0}>
            {spans.map((value) => (
              <Stack gap={4}>
                <Badge color={"grape"} size="xs" variant="light">
                  {value.type}
                </Badge>
                {renderRowIfExists(
                  `Project Id`,
                  value.data.project?.project_id,
                )}
                {renderRowIfExists(
                  `Channel Id`,
                  value.data.channel?.channel_id,
                )}
                {renderRowIfExists(`Chat Id`, value.data.message?.chat_id)}
                {renderRowIfExists(`Client Id`, value.data.message?.client_id)}
                {renderRowIfExists(
                  `Message Id`,
                  value.data.message?.message_id,
                )}
                {renderRowIfExists(`Request`, value.data.database?.request)}
                {renderRowIfExists(
                  `Request`,
                  value.data.database?.result?.request,
                )}
                {renderRowIfExists(`Request`, value.data.mixed?.request)}
                {renderRowIfExists(`Type`, value.data.openai?.type)}
                {renderRowIfExists(`Action`, value.data.channel?.action)}
                {value.duration ? (
                  <Tooltip label="Duration" offset={5} position="bottom">
                    <Group gap={4}>
                      <IconClockFilled size={12} />
                      <Text size={"xs"}>
                        {Number.parseFloat(value.duration as any).toFixed(2)} ms
                      </Text>
                    </Group>
                  </Tooltip>
                ) : null}
                <Divider
                  label={value.delta ? `+ ${value.delta?.toFixed(2)} ms` : null}
                  mb={8}
                  mt={4}
                />
              </Stack>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel pt={12} value="raw">
          {trace.list.map((value, index, array) => (
            <Paper>
              <Stack gap={"md"}>
                <Group gap={"xs"}>
                  <Title order={4}>{value.name}</Title>
                </Group>
                <Stack>
                  {value.attributes.start &&
                  array[index - 1]?.attributes?.start ? (
                    <Text c={"dimmed"} size={"xs"}>
                      <strong>+</strong>{" "}
                      {value.attributes.start -
                        array[index - 1]?.attributes.start}{" "}
                      ms
                    </Text>
                  ) : null}
                  <Text c={"dimmed"} size={"xs"}>
                    <strong>ID</strong>: {value.span_id}
                  </Text>
                </Stack>
                {/*@ts-ignore*/}
                <JSONTree
                  theme={{
                    author: "wimer hazenberg (http://www.monokai.nl)",
                    base00: "#272822",
                    base01: "#383830",
                    base02: "#49483e",
                    base03: "#75715e",
                    base04: "#a59f85",
                    base05: "#f8f8f2",
                    base06: "#f5f4f1",
                    base07: "#f9f8f5",
                    base08: "#f92672",
                    base09: "#fd971f",
                    base0A: "#f4bf75",
                    base0B: "#a6e22e",
                    base0C: "#a1efe4",
                    base0D: "#66d9ef",
                    base0E: "#ae81ff",
                    base0F: "#cc6633",
                    scheme: "monokai",
                  }}
                  data={value.attributes}
                />
                <Stack gap={4}>
                  {value.attributes.duration ? (
                    <Text c={"dimmed"} size={"xs"}>
                      <strong>Duration</strong>:{" "}
                      {Number.parseFloat(value.attributes.duration)} ms
                    </Text>
                  ) : null}
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
