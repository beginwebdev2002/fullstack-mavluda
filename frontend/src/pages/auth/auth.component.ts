import { CommonModule, DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from "@angular/core";
import { SigninFormComponent, SigninFormModel, SignupFormComponent, SignupFormModel } from "@features/auth";
import { LanguageSwitcherComponent } from "@features/language-selection";
import { AuthService } from "@features/user";
import { objectExcludePropety } from "@shared/lib";

@Component({
  selector: "app-auth",
  imports: [CommonModule, LanguageSwitcherComponent, SigninFormComponent, SignupFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  private document: Document = inject(DOCUMENT);
  private readonly authService = inject(AuthService);

  isDarkMode = signal(this.document.documentElement.classList.contains("dark"));


  authMode = signal<"signin" | "signup">("signin");

  setAuthMode(mode: "signin" | "signup") {
    this.authMode.set(mode);
  }


  toggleTheme() {
    this.document.documentElement.classList.toggle("dark");
    this.isDarkMode.set(
      this.document.documentElement.classList.contains("dark"),
    );
  }


  onSignInSubmit(body: SigninFormModel) {
    this.authService.signin(body)
    .subscribe();
  }

  onSignupSubmit(body: SignupFormModel) {
    this.authService.signup(body)
    .subscribe();
  }

}
