export interface FunctionsListItem {
  description?: string;
  documentation: string;
  examples?: string[];
  function_data: object;
  function_id: string;
  function_type: string;
  name: string;
  parameters: object;
  project_id: string;
}

export type CreateFunction = Omit<
  FunctionsListItem,
  "function_id" | "project_id"
>;
export type UpdateFunction = CreateFunction;

export type FunctionsListResponse = FunctionsListItem[];

export type FunctionResponse = FunctionsListItem;
