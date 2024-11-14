import { axiosClassic } from "@/app/api/axios/axios";
import { removeFromStorage, saveTokenStorage } from "./auth.helper";
import { IAuthResponse, IFormData } from "./auth.types";

export enum EnumTokens {
  "ACCESS_TOKEN" = "accessToken",
  "REFRESH_TOKEN" = "refreshToken",
}

export const authService = {
  async login(data: IFormData) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/login`,
      data
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },
  async register(data: IFormData) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/register`,
      data
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>("/auth/refresh");
    console.log(response.data.accessToken);
    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>("/auth/logout");
    if (response.data) removeFromStorage();

    return response;
  },
};
