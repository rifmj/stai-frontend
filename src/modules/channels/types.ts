export interface ProjectsListItem {
  description: string;
  project_id: string;
  project_name: string;
}

export interface ChannelsListItem {
  api_key: string;
  api_secret: string;
  channel_id: string;
  custom_fields: object;
  project_id: string;
  type: "Telegram" | "WhatsApp";
  webhook_url: string;
}

export type CreateProject = Exclude<ProjectsListItem, "project_id">;
export type UpdateProject = CreateProject;

export type ChannelsListResponse = ChannelsListItem[];
export type ProjectsListResponse = ProjectsListItem[];

export type ProjectResponse = ProjectsListItem;
export type ChannelResponse = ChannelsListItem;
