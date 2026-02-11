
import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PortfolioPageComponent } from './pages/portfolio/portfolio.component';
import { ServicesCatalogComponent } from './pages/services-catalog/services-catalog.component';
import { ServicesPageComponent } from './pages/services/services.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { VeilPageComponent } from './pages/veil/veil.component';
import { VeilsCatalogComponent } from './pages/veils-catalog/veils-catalog.component';
import { AdminLayoutComponent } from './widgets/layouts/admin-layout.component';
import { UserLayoutComponent } from './widgets/layouts/user-layout.component';
import { adminGuard } from './app/core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  
  // Admin Routes
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    // canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'veil', component: VeilPageComponent },
      { path: 'services', component: ServicesPageComponent },
      { path: 'clients', component: DashboardComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },

  // User Routes
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/user-home/user-home.component').then(m => m.UserHomeComponent) },
      { path: 'collection', loadComponent: () => import('./pages/veils-catalog/veils-catalog.component').then(m => m.VeilsCatalogComponent) },
      { path: 'services', loadComponent: () => import('./pages/services-catalog/services-catalog.component').then(m => m.ServicesCatalogComponent) },
      { path: 'portfolio', loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioPageComponent) },
      { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
      { path: 'profile', loadComponent: () => import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent) }
    ]
  },

  { path: '**', redirectTo: 'user/home' }
];
