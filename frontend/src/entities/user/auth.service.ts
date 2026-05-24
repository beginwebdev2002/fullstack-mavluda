import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User, AuthResponse } from './model/user.model';
import { jwtDecode } from 'jwt-decode';
import { SigninFormModel, SignupFormModel } from '@features/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private _currentUser = signal<User | null>(null);
  
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.role === 'admin');
  

  authInit(): Observable<User> {
    return this.me()
    .pipe(tap(user => {      
      if(!user) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this._currentUser.set(user);
      if(user.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/home']);
      }
    }));
  }

  signin(body: SigninFormModel) {
    return this.http.post<AuthResponse>('/auth/login', body)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this._currentUser.set(response.user);
          this.setSession(response.access_token, response.user);
          this.router.navigate(['/user/home']);
        }
      })
    );
  }

  signup(body: Partial<SignupFormModel>) {
    return this.http.post<AuthResponse>('/auth/register', body)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this._currentUser.set(response.user);
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  refreshToken() {
    return this.http.get<AuthResponse>('/auth/refresh')
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
  me(): Observable<User> {
    const token = sessionStorage.getItem('token');
    if(!token) return of(null);
    return this.http.get<User>('/auth/me');
  }

  private setSession(token: string, userPayload: User) {
    sessionStorage.setItem('token', token);
    this._currentUser.set(userPayload);
  }
}
