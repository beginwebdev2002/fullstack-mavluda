export const API_ENDPOINTS = {
  AdminSettings: '/admin-settings',
  Users: '/users',
  Veils: '/veils',
  Services: '/services',
  Gallery: '/gallery',
  Payments: '/payments',
  Auth: '/auth',
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
