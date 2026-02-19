import { Routes } from "@angular/router";
import { AboutComponent } from "@pages/about";
import { AuthComponent } from "@pages/auth";
import { DashboardComponent } from "@pages/dashboard";
import { GalleryComponent } from "@pages/gallery";
import { PortfolioPageComponent } from "@pages/portfolio";
import { ServicesCatalogComponent } from "@pages/services-catalog";
import { ServicesPageComponent } from "@pages/services";
import { SettingsComponent } from "@pages/settings";
import { UserHomeComponent } from "@pages/user-home";
import { UserProfileComponent } from "@pages/user-profile";
import { VeilPageComponent } from "@pages/veil";
import { VeilsCatalogComponent } from "@pages/veils-catalog";
import { AdminLayoutComponent } from "@widgets/layouts";
import { UserLayoutComponent } from "@widgets/layouts";
import { adminGuard } from "@core/guards";

export const routes: Routes = [
  { path: "", redirectTo: "user/home", pathMatch: "full" },
  { path: "auth", component: AuthComponent },

  // Admin Routes
  {
    path: "admin",
    component: AdminLayoutComponent,
    // canActivate: [adminGuard],
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
        path: "services",
        loadComponent: () =>
          import("@pages/services").then((m) => m.ServicesPageComponent),
      },
      {
        path: "clients",
        loadComponent: () =>
          import("@pages/dashboard").then((m) => m.DashboardComponent),
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
        path: "services",
        loadComponent: () =>
          import("@pages/services-catalog").then(
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
