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
  GALLERY: {
    URL: "gallery",
    BASE: linkServerConvert("gallery"),
    URL_BY_ID: (id: string) => linkServerConvert(API_ENDPOINTS.GALLERY.URL, id),
  },
  AUTH: {
    LOGIN: linkServerConvert("auth", "login"),
    REGISTER: linkServerConvert("auth", "register"),
  },

  USER: {
    PROFILE: linkServerConvert("user", "profile"),
    UPDATE: linkServerConvert("user", "update"),
  },
  ADMIN: {
    SETTINGS: linkServerConvert("admin-settings"),
    ANALYTICS: linkServerConvert("admin", "analytics"),
  },
} as const;
