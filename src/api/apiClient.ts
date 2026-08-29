const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com";
const BASE_URL = `${API_ORIGIN.replace(/\/$/, "")}/api/v1`;

const fetchClient = {
  request: async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("marketingsetu_user_token");
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        cache: "no-store",
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `API Error: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`API Error on ${options.method || "GET"} ${path}:`, error);
      throw error;
    }
  },

  get: <T>(path: string, options: RequestInit = {}) =>
    fetchClient.request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, data: any, options: RequestInit = {}) =>
    fetchClient.request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(path: string, data: any, options: RequestInit = {}) =>
    fetchClient.request<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(path: string, data: any, options: RequestInit = {}) =>
    fetchClient.request<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(path: string, options: RequestInit = {}) =>
    fetchClient.request<T>(path, { ...options, method: "DELETE" }),
};

export default fetchClient;
