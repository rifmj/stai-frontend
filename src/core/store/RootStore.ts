import Bootstrap from "@/core/Bootstrap";
import Config from "@/core/ConfigStore";
import { IStore } from "@/core/store/types";
import Api from "@/sdk/services/Api";
import logger from "@/sdk/utils/Logger";

export class RootStore implements IStore {
  public api: Api = new Api({
    getAccessToken: () => {
      // @ts-ignore
      return AccessToken.from(this.user.access_token);
    },
  });

  public config = new Config({
    api: this.api,
  });

  // eslint-disable-next-line perfectionist/sort-classes
  public bootstrap = new Bootstrap({
    config: this.config,
  });

  public logger = logger;
}
