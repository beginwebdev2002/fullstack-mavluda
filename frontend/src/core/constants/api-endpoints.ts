import { linkServerConvert } from "@shared/lib";

export const API_ENDPOINTS = {
  VEILS: {
    URL: "veils",
    BASE: linkServerConvert("veils"),
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.VEILS.URL, id),
  },
  TREATMENTS: {
    URL: "treatments",
    BASE: linkServerConvert("treatments"),
    URL_BY_ID: (id: string) =>
      linkServerConvert(API_ENDPOINTS.TREATMENTS.URL, id),
  },
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
} as const;
