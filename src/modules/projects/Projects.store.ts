import Api from "@/sdk/services/Api";
import { makeAutoObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export default class ProjectsStore {
  currentProject?: string;

  isHydrated = false;

  constructor(
    private deps: {
      api: Api;
    },
  ) {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "stAIProjectsStore",
      properties: ["currentProject"],
      storage: window.localStorage,
    }).then((value) => {
      this.isHydrated = true;
    });
  }

  setCurrentProject(id: string) {
    this.currentProject = id;
  }
}
