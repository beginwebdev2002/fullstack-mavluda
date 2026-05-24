import {
  APP_INITIALIZER,
  provideAppInitializer,
  ApplicationConfig,
  provideZonelessChangeDetection,
  inject,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withHashLocation } from "@angular/router";
import { routes } from "@src/app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { apiInterceptor, errorInterceptor } from "@core/interceptors";
import { AuthService } from "@entities/user";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptor, errorInterceptor]),
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.authInit();
    })
  ],
};
