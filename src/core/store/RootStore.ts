import Bootstrap from "@/core/Bootstrap";
import Config from "@/core/ConfigStore";
import { IStore } from "@/core/store/types";
import UserStore from "@/core/user/User.store";
import ProjectsStore from "@/modules/projects/Projects.store";
import Api from "@/sdk/services/Api";
import logger from "@/sdk/utils/Logger";

export class RootStore implements IStore {
  public api: Api = new Api({
    getAccessToken: () => {
      // @ts-ignore
      // return AccessToken.from(this.user.access_token);
      return this.user.access_token;
      // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTAyYjQyYi00ODA3LTQ0MjQtOGZiZS05N2JmNzk1MDZmZjMiLCJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MDEzNDc2MTgsImV4cCI6MTcwNDAyNjAxOH0.-3sAUGIfMdOgiIADTZY8z8QhgD95AY8V5CpWAli2bxg";
    },
  });

  // eslint-disable-next-line perfectionist/sort-classes
  public config = new Config({
    api: this.api,
  });

  // eslint-disable-next-line perfectionist/sort-classes
  public bootstrap = new Bootstrap({
    config: this.config,
  });

  public logger = logger;

  public projects = new ProjectsStore({
    api: this.api,
  });

  public user = new UserStore({
    api: this.api,
  });
}
