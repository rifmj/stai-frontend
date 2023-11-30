import Bootstrap from "@/core/Bootstrap";
import Config from "@/core/ConfigStore";
import UserStore from "@/core/user/User.store";
import ProjectsStore from "@/modules/projects/Projects.store";
import Api from "@/sdk/services/Api";
import Logger from "@/sdk/utils/Logger/Logger";

export interface IStore {
  api: Api;
  bootstrap: Bootstrap;
  config: Config;
  logger: Logger;
  projects: ProjectsStore;
  user: UserStore;
}
