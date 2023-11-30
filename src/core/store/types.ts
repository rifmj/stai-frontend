import Bootstrap from "@/core/Bootstrap";
import Config from "@/core/ConfigStore";
import Api from "@/sdk/services/Api";
import Logger from "@/sdk/utils/Logger/Logger";

export interface IStore {
  api: Api;
  bootstrap: Bootstrap;
  config: Config;
  logger: Logger;
}
