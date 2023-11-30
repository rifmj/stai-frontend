import Api from "@/sdk/services/Api";

export default class UserApi {
  constructor(
    private deps: {
      api: Api;
    },
  ) {}

  async login(username: string, password: string) {
    console.info("LogIn", username, password);
    const data = await this.deps.api.post<{
      access_token: string;
      refresh_token: string;
    }>(`auth/login`, {
      password,
      username,
    });
    console.info("LogIn:result", username, password, data);
    return data.data;
  }

  async me() {
    const data = await this.deps.api.get(`profile`);
    return data.data;
  }
}
