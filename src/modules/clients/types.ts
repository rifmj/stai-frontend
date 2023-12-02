export interface ClientListItem {
  auth_token: null | string;
  client_id: string;
  custom_fields: any;
  external_id: null | string;
  name: string;
  scenario_id: null | string;
}

export type CreateClient = Omit<ClientListItem, "client_id">;
export type UpdateClient = Partial<CreateClient>;

export type ClientListResponse = ClientListItem[];
export type ClientResponse = ClientListItem;
