import Api from "@/sdk/services/Api";

export default class UserApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async me() {
    const data = await this.deps.api.get(`profile`);
    return data.data;
  }
}
