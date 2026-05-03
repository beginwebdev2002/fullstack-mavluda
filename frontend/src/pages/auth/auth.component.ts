import { CommonModule, DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@entities/user";
import { SIGNIN_FORM_INITIAL_VALUES, SigninFormModel, signinFormSchema } from "@features/auth/model/auth.model";
import { LanguageSwitcherComponent } from "@features/language-selection";
import { SigninFormComponent, SignupFormComponent } from "@features/auth";

@Component({
  selector: "app-auth",
  imports: [CommonModule, LanguageSwitcherComponent, SigninFormComponent, SignupFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  private document: Document = inject(DOCUMENT);

  isDarkMode = signal(this.document.documentElement.classList.contains("dark"));

  // 'signin' or 'signup' mode
  authMode = signal<"signin" | "signup">("signin");

  constructor() {
  }

  setAuthMode(mode: "signin" | "signup") {
    this.authMode.set(mode);
  }


  toggleTheme() {
    this.document.documentElement.classList.toggle("dark");
    this.isDarkMode.set(
      this.document.documentElement.classList.contains("dark"),
    );
  }

}
