import { makeAutoObservable } from "mobx";

export default class Bootstrap {
  isCompleted = false;

  constructor(private deps: {}) {
    makeAutoObservable(this);
  }

  async __complete__() {
    this.isCompleted = true;
  }

  async initialize(isAuthenticated: boolean) {
    this.isCompleted = true;
  }

  async reset() {
    this.isCompleted = false;
  }
}
