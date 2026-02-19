export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/update",
  },
  ADMIN: {
    SETTINGS: "/admin-settings",
    ANALYTICS: "/admin/analytics",
  },
  VEILS: {
    BASE: "/veils",
    DETAILS: (id: string) => `/veils/${id}`,
  },
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
