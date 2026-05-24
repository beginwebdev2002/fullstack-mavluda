import { linkServerConvert } from "@shared/lib";

export const API_ENDPOINTS = {
  VEILS: {
    URL: "veils",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.VEILS.URL, id),
  },
  TREATMENTS: {
    URL: "treatments",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.TREATMENTS.URL, id),
  },
  GALLERY: {
    URL: "gallery",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.GALLERY.URL, id),
  },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    CHECK_ADMIN: "/auth/check-admin",
    REFRESH: "/auth/refresh",
    TELEGRAM: "/auth/telegram",
  },
  ADMIN: {
    SETTINGS: "/admin-settings",
    ANALYTICS: "/admin/analytics",
  },
} as const;
