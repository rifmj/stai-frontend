export interface ProjectsListItem {
  description: string;
  project_id: string;
  project_name: string;
}

export type CreateProject = Exclude<ProjectsListItem, "project_id">;
export type UpdateProject = CreateProject;

export type ProjectsListResponse = ProjectsListItem[];

export type ProjectResponse = ProjectsListItem;
