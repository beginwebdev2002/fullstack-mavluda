import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withHashLocation } from "@angular/router";
import { apiInterceptor, errorInterceptor } from "@core/interceptors";
import { SessionService } from "@entities/session/model/session.service";
import { routes } from "@src/app.routes";

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
      const sessionService = inject(SessionService);
      return sessionService.loadProfile();
    })
  ],
};
