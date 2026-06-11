import { linkServerConvert } from "@shared/lib";

export const API_ENDPOINTS = {
  VEILS: {
    URL: "veils",
    COUNT: "veils/count",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.VEILS.URL, id),
  },
  TREATMENTS: {
    URL: "treatments",
    COUNT: "treatments/count",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.TREATMENTS.URL, id),
  },
  GALLERY: {
    URL: "gallery",
    COUNT: "gallery/count",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.GALLERY.URL, id),
  },
  AUTH: {
    SIGNIN: "auth/login",
    REGISTER: "auth/register",
    ME: "auth/me",
    CHECK_ADMIN: "auth/check-admin",
    REFRESH: "auth/refresh",
    TELEGRAM: "auth/telegram",
    LOGOUT: "auth/logout",
  },
  ADMIN: {
    SETTINGS: "admin-settings",
    ANALYTICS: "admin/analytics",
  },
  USERS: {
    URL: "users",
    COUNT: "users/count",
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.USERS.URL, id),
  }
} as const;
