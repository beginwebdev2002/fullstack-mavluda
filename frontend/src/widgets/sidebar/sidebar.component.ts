import { Component, ChangeDetectionStrategy, signal } from "@angular/core";
import { inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
import { SafeHtmlPipe } from "@shared/pipes";

interface MenuItem {
  label: string;
  route: string;
  exact: boolean;
  icon: string;
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  // Fix: Add explicit type `Router` to injected router to resolve type inference issue.
  private router: Router = inject(Router);
  currentUrl = signal("/");

  menuItems = signal<MenuItem[]>([
    {
      label: $localize`:@@sidebar.dashboard:Dashboard`,
      route: "/admin/dashboard",
      exact: true,
      icon: '<span class="material-symbols-outlined">grid_view</span>',
    },
    {
      label: $localize`:@@sidebar.veil:Veil`,
      route: "/admin/veil",
      exact: false,
      icon: '<span class="material-symbols-outlined">checkroom</span>',
    },
    {
      label: $localize`:@@sidebar.treatments:Treatments`,
      route: "/admin/treatments",
      exact: false,
      icon: '<span class="material-symbols-outlined">spa</span>',
    },
    {
      label: $localize`:@@sidebar.clients:Clients`,
      route: "/admin/clients",
      exact: false,
      icon: '<span class="material-symbols-outlined">group</span>',
    },
    {
      label: $localize`:@@sidebar.gallery:Gallery`,
      route: "/admin/gallery",
      exact: false,
      icon: '<span class="material-symbols-outlined">collections</span>',
    },
    {
      label: $localize`:@@sidebar.settings:Settings`,
      route: "/admin/settings",
      exact: false,
      icon: '<span class="material-symbols-outlined">settings</span>',
    },
  ]);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  isActive(route: string, exact: boolean): boolean {
    return exact
      ? this.currentUrl() === route
      : this.currentUrl().startsWith(route);
  }
}
