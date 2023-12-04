interface InputData {
  attributes: {
    end: number;
    start: number;
  };
  name: string;
  parent_span_id: null | string;
  span_id: string;
  trace_id: string;
}

interface TreeNode {
  children: TreeNode[];
  name: string;
  parent_span_id: string;
  span_id: string;
  value: number;
}

export function buildSpansTree(inputArray: InputData[]): TreeNode[] {
  const spanMap: { [id: string]: TreeNode } = {};

  // Create a map of spans by their span_id
  for (const input of inputArray) {
    const { attributes, name, parent_span_id, span_id } = input;
    const duration = attributes.end - attributes.start;

    spanMap[span_id] = {
      children: [],
      name,
      parent_span_id,
      span_id,
      value: duration.toFixed(2) as any,
    };
  }

  // Build the tree structure based on parent_span_id
  const rootNodes: TreeNode[] = [];

  console.info("SPAN_MAP", spanMap);

  for (const input of inputArray) {
    const { parent_span_id, span_id } = input;
    const currentNode = spanMap[span_id];

    if (parent_span_id === null) {
      // This is a root node
      rootNodes.push(currentNode);
    } else {
      // This is a child node, so we attach it to its parent
      const parentNode = spanMap[parent_span_id];
      if (parentNode) {
        console.info("Found parent node", parentNode);
        parentNode.children.push({
          children: [],
          name: currentNode.name,
          parent_span_id: parent_span_id,
          span_id: currentNode.span_id,
          value: currentNode.value,
        });
        console.info("got", parentNode);
      }
    }
  }

  console.info("ROOT_NODES", rootNodes);

  return rootNodes;
}
