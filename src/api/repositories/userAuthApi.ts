import fetchClient from "../apiClient";

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      phone: string;
      firstName: string;
      lastName: string;
      email?: string | null;
      plan?: string | null;
      planExpiresAt?: string | null;
      isActive: boolean;
      accessKey?: string | null;
    };
    role: string;
    token: string;
  };
}

export const UserAuthApi = {
  login: async (phone: string, password: string) => {
    return fetchClient.post<LoginResponse>("/user/login", {
      phone,
      password,
      clientType: "web",
    });
  },

  getProfile: async () => {
    return fetchClient.get<{ statusCode: number; message: string; data: any }>("/user/profile");
  },

  updateProfile: async (data: { firstName?: string; lastName?: string; email?: string }) => {
    return fetchClient.post<{ statusCode: number; message: string; data: any }>("/user/profile", data);
  },
};
