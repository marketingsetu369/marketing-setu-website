const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://api.ottodeals.com"}/api/v1`;

const fetchClient = {
  request: async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API Error: ${response.status} ${response.statusText}`
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

  delete: <T>(path: string, options: RequestInit = {}) =>
    fetchClient.request<T>(path, { ...options, method: "DELETE" }),
};

export default fetchClient;
