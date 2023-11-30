import UserApi from "@/core/user/User.api";
import Api from "@/sdk/services/Api";
import logger, { LoggerSpace } from "@/sdk/utils/Logger";
import { computed, makeAutoObservable, runInAction, when } from "mobx";
import { makePersistable } from "mobx-persist-store";

export default class UserStore {
  private api: UserApi;
  access_token: string;
  public expoPushToken: string | undefined = undefined;

  isAuthError = false;

  isHydrated = false;
  public isSignedOut: boolean = undefined;

  isUserLoading = false;
  isUserLoadingError = false;
  refresh_token?: string;
  user: any = undefined;

  constructor(
    private deps: {
      api: Api;
    },
  ) {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserStore",
      properties: ["access_token", "refresh_token", "user", "expoPushToken"],
    }).then((value) => {
      this.isHydrated = true;
    });
    this.api = new UserApi({ api: deps.api });
  }

  async init() {
    await when(() => this.isHydrated);
    logger.logWithTitle(LoggerSpace.User, "Init UserStore", {
      access_token: this.access_token,
      refresh_token: this.refresh_token,
    });
    if (this.access_token) {
      try {
        await this.loadCurrentUser();
      } catch (error: unknown) {
        console.info("loadCurrentUser:error", error);
      }
    } else {
    }
  }

  @computed
  public get isAuthorized() {
    return Boolean(this.user);
  }

  async loadCurrentUser() {
    this.isUserLoading = true;
    try {
      const userData = await this.api.me();
      runInAction(() => {
        this.user = userData;
      });
      this.isUserLoadingError = false;
      logger.logWithTitle(LoggerSpace.User, "User authorized");
    } catch {
      this.isUserLoadingError = true;
    } finally {
      this.isUserLoading = false;
    }
  }

  async logOut() {
    this.isSignedOut = true;
    this.access_token = undefined;
    this.refresh_token = undefined;
    this.user = undefined;
    this.isAuthError = false;
  }

  setAccessToken(accessToken?: string) {
    this.access_token = accessToken;
  }

  setSignedOut(value: boolean | null) {
    this.isSignedOut = false;
  }
}
