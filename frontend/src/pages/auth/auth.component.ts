import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { AuthService } from '@entities/user/auth.service';
import { LanguageSwitcherComponent } from '../../features/language-selection/language-switcher.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormField, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private router: Router = inject(Router);
  public authService = inject(AuthService);
  private document: Document = inject(DOCUMENT);
  
  isLoading = signal(false);
  showPassword = signal(false);
  isDarkMode = signal(this.document.documentElement.classList.contains('dark'));
  errorMessage = signal<string | null>(null);
  
  // 'signin' or 'signup' mode
  authMode = signal<'signin' | 'signup'>('signin');

  loginModel = signal({
    firstName: '',
    lastName: '',
    phone: '',
    email: 'admin@mavluda.beauty',
    password: 'password123',
    rememberMe: false
  });

  loginForm = form(this.loginModel, (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 6);
  });

  constructor() {
    // Effect to clear/restore defaults when switching modes
    effect(() => {
      const mode = this.authMode();
      this.errorMessage.set(null);
      
      const current = this.loginModel();
      
      if (mode === 'signup') {
        // Clear defaults if switching to signup and generic admin email is present
        if (current.email === 'admin@mavluda.beauty') {
           this.loginModel.update(v => ({...v, firstName: '', lastName: '', email: '', password: ''}));
        }
      } else {
        // Restore default admin credentials for demo convenience if empty
        if (!current.email) {
           this.loginModel.update(v => ({...v, email: 'admin@mavluda.beauty', password: 'password123'}));
        }
      }
    });
  }

  setAuthMode(mode: 'signin' | 'signup') {
    this.authMode.set(mode);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  toggleTheme() {
    this.document.documentElement.classList.toggle('dark');
    this.isDarkMode.set(this.document.documentElement.classList.contains('dark'));
  }

  continueWithTelegram() {
    console.log("Triggering Telegram login flow...");
  }

  onSubmit() {
    // Manual validation check
    const emailValid = this.loginForm.email().valid();
    const passValid = this.loginForm.password().valid();
    
    if (!emailValid || !passValid) {
       // Since we don't have markAllAsTouched, we rely on user having interacted or just return
       // If fields are untouched, valid() might be false but errors not shown?
       // Usually required() makes it invalid immediately but touched is false.
       return;
    }

    // Manual validation for signup fields
    if (this.authMode() === 'signup') {
      const firstName = this.loginModel().firstName;
      const lastName = this.loginModel().lastName;
      
      if (!firstName || !lastName) {
         return;
      }
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    // Get values directly from model signal
    const formValue = this.loginModel();
    const mode = this.authMode();

    if (mode === 'signin') {
      this.authService.login({
        email: formValue.email,
        password: formValue.password
      }).subscribe({
        next: () => {
           this.isLoading.set(false);
           if (this.authService.isAdmin()) {
             this.router.navigate(['/admin/dashboard']);
           } else {
             this.router.navigate(['/user/home']);
           }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set('Login failed. Please check credentials.');
          console.error(err);
        }
      });
    } else {
      this.authService.register({
        firstName: formValue.firstName,
        lastName: formValue.lastName || undefined,
        email: formValue.email,
        password: formValue.password
      }).subscribe({
        next: () => {
           this.isLoading.set(false);
           this.router.navigate(['/user/home']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set('Registration failed. Email might be taken.');
          console.error(err);
        }
      });
    }
  }
}
