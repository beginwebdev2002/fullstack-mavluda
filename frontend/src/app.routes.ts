import { Routes } from "@angular/router";
import { AuthComponent } from "@pages/auth";
import { AdminLayoutComponent, UserLayoutComponent } from "@widgets/layouts";
import { adminGuard } from "@core/guards";

export const routes: Routes = [
  { path: "", redirectTo: "user/home", pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  {
    path: "admin/login",
    loadComponent: () => import("./pages/admin-login").then((m) => m.AdminLoginComponent),
  },

  // Admin Routes
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadComponent: () =>
          import("@pages/dashboard").then((m) => m.DashboardComponent),
      },
      {
        path: "veil",
        loadComponent: () =>
          import("@pages/veil").then((m) => m.VeilPageComponent),
      },
      {
        path: "treatments",
        loadComponent: () =>
          import("@pages/treatments").then((m) => m.TreatmentsPageComponent),
      },
      {
        path: "clients",
        loadComponent: () =>
          import("@pages/clients").then((m) => m.ClientsPageComponent),
      },
      {
        path: "gallery",
        loadComponent: () =>
          import("@pages/gallery").then((m) => m.GalleryComponent),
      },
      {
        path: "settings",
        loadComponent: () =>
          import("@pages/settings").then((m) => m.SettingsComponent),
      },
    ],
  },

  // User Routes
  {
    path: "user",
    component: UserLayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadComponent: () =>
          import("@pages/user-home").then((m) => m.UserHomeComponent),
      },
      {
        path: "collection",
        loadComponent: () =>
          import("@pages/veils-catalog").then((m) => m.VeilsCatalogComponent),
      },
      {
        path: "treatments",
        loadComponent: () =>
          import("@pages/treatments-catalog").then(
            (m) => m.ServicesCatalogComponent,
          ),
      },
      {
        path: "portfolio",
        loadComponent: () =>
          import("@pages/portfolio").then((m) => m.PortfolioPageComponent),
      },
      {
        path: "about",
        loadComponent: () =>
          import("@pages/about").then((m) => m.AboutComponent),
      },
      {
        path: "profile",
        loadComponent: () =>
          import("@pages/user-profile").then((m) => m.UserProfileComponent),
      },
    ],
  },

  { path: "**", redirectTo: "user/home" },
];
