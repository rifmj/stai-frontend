import Api from "@/sdk/services/Api";
import logger, { LoggerSpace } from "@/sdk/utils/Logger";
import { makeAutoObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export default class Config {
  @observable
  public useDarkMode = true;

  constructor(
    private deps: {
      api: Api;
    },
  ) {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "ConfigStore",
      properties: ["useDarkMode"],
      storage: window.localStorage,
    }).then((value) => {
      logger.logWithTitle(
        LoggerSpace.Bootstrap,
        `UiConfig is loaded. Hydrated = ${value.isHydrated}`,
        value,
      );
    });
  }

  setUseDarkMode(value: boolean) {
    this.useDarkMode = value;
  }
}
