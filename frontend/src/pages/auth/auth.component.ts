import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@entities/user/auth.service';
import { LanguageSwitcherComponent } from '../../features/language-selection/language-switcher.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  public authService = inject(AuthService);
  private document: Document = inject(DOCUMENT);
  
  isLoading = signal(false);
  showPassword = signal(false);
  isDarkMode = signal(this.document.documentElement.classList.contains('dark'));
  errorMessage = signal<string | null>(null);
  
  // 'signin' or 'signup' mode
  authMode = signal<'signin' | 'signup'>('signin');

  loginForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['admin@mavluda.beauty', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]]
  });

  setAuthMode(mode: 'signin' | 'signup') {
    this.authMode.set(mode);
    this.errorMessage.set(null); // Clear errors
    const firstNameControl = this.loginForm.get('firstName');
    const lastNameControl = this.loginForm.get('lastName');

    if (mode === 'signup') {
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);

      // Clear defaults for signup
      if (this.loginForm.get('email')?.value === 'admin@mavluda.beauty') {
        this.loginForm.patchValue({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
      }
    } else {
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();

      // Restore default admin credentials for demo convenience if empty
      if (!this.loginForm.get('email')?.value) {
        this.loginForm.patchValue({
          email: 'admin@mavluda.beauty',
          password: 'password123'
        });
      }
    }
    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
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
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      
      const formValue = this.loginForm.value;
      const mode = this.authMode();

      if (mode === 'signin') {
        this.authService.login({
          email: formValue.email!,
          password: formValue.password!
        }).subscribe({
          next: () => {
             this.isLoading.set(false);
             // Navigation handled in guard or explicit check
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
          firstName: formValue.firstName!,
          lastName: formValue.lastName || undefined,
          email: formValue.email!,
          password: formValue.password!
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
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
