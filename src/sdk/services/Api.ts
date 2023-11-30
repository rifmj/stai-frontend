import { API_BASE_URL } from "@/core/constants";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import * as AxiosLogger from "axios-logger";

import logger, { LoggerSpace } from "../utils/Logger";

AxiosLogger.setGlobalConfig({
  headers: true,
  status: true,
});

axios.interceptors.request.use(async function (config) {
  logger.logWithTitle(
    LoggerSpace.Network_Request,
    config.method || "",
    config.url,
    config.params,
    config.data,
  );
  return { ...config };
}, AxiosLogger.errorLogger);

axios.interceptors.response.use(
  async (response) => {
    logger.logWithTitle(
      LoggerSpace.Network_Response,
      response.config?.method || "",
      response.config?.url,
      response.status,
      response.data,
    );
    return response;
  },
  async (error: AxiosError) => {
    // await AxiosLogger.errorLogger(error);
    logger.logWithTitle(
      LoggerSpace.Network_Response,
      error.config?.method || "",
      error.config?.url,
      error.response?.status,
      error.response?.data,
    );

    if (error.response?.status === 401 || error.response?.status === 403) {
    }

    throw error;
  },
);

export interface IRequestOptions {
  accessToken?: string;
  data?: any;
  deviceId?: string;
  headers?: Record<string, string>;
  ignoreAccidentMode?: boolean;
  method?: Method;
  params?: any;
  path?: string;
  retries?: number;
  url?: string;
}

export default class Api {
  baseUrl: string = API_BASE_URL;

  constructor(
    private deps: {
      getAccessToken: () => string | undefined;
    },
  ) {
    this.getBaseUrl();
  }

  private async authorizedRequest<Response = any>(
    options: IRequestOptions,
  ): Promise<AxiosResponse<Response>> {
    return this.request({
      ...options,
      accessToken: this.deps.getAccessToken(),
    });
  }

  private getBaseUrl() {
    return this.baseUrl;
  }

  public delete<Response = any>(
    path: string,
    data?: any,
    parameters?: any,
    options?: IRequestOptions,
  ) {
    return this.authorizedRequest<Response>({
      data,
      method: "DELETE",
      params: parameters,
      path,
      ...options,
    });
  }

  public get<Response = any>(
    path: string,
    parameters?: any,
    options?: IRequestOptions,
  ) {
    return this.authorizedRequest<Response>({
      method: "GET",
      params: parameters,
      path,
      ...options,
    });
  }

  public post<Response = any>(
    path: string,
    data?: any,
    options?: IRequestOptions,
  ) {
    return this.authorizedRequest<Response>({
      data,
      method: "POST",
      path,
      ...options,
    });
  }

  public put<Response = any>(
    path: string,
    data?: any,
    options?: IRequestOptions,
  ) {
    return this.authorizedRequest<Response>({
      data,
      method: "PUT",
      path,
      ...options,
    });
  }

  public async request<Response = any>(
    options: IRequestOptions,
  ): Promise<AxiosResponse<Response>> {
    return axios({
      data: options.data,
      headers: options.accessToken
        ? {
            Authorization:
              options.accessToken && `Bearer ${options.accessToken}`,
            ...options.headers,
          }
        : {},
      method: options.method,
      params: options.params,
      responseType: "json",
      timeout: 60e3,
      url: options.url || `${this.baseUrl}${options.path}`,
    });
  }
}
