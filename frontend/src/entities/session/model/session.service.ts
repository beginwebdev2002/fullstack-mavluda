import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse, User } from '@entities/user';
import { Roles } from '../constants/session';
import { API_ENDPOINTS } from '@src/core/constants';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly STORAGE_KEY = 'access_token';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === Roles.ADMIN);
  
  currentUser = signal<User | null>(null);

  setSession(sessionData: AuthResponse): void {
    if (!sessionData) return
    
    this.saveToken(sessionData.access_token);
    this.currentUser.set(sessionData.user);
  }

  hasPermission(roles: string[]): boolean {
    const userRole = this.currentUser()?.role;
    if (!userRole) return false;
    return roles.includes(userRole);
  }

  // refreshToken(): Observable<string> {
  //   return this.http.post<{ accessToken: string }>('/api/auth/refresh', {}).pipe(
  //     tap((res) => {
  //       // Здесь можно обновить локальное состояние, если бэкенд возвращает данные пользователя
  //     }),
  //     map((res) => res.accessToken)
  //   );
  // }
  logout(): void {
    this.clearSession();
    this.http.post(API_ENDPOINTS.AUTH.LOGOUT, {})
    .subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  loadProfile(): Observable<User> {
    const token = sessionStorage.getItem(this.STORAGE_KEY);
    if (!token) {
      return of(null);
    }
    return this.http.get<User>(API_ENDPOINTS.AUTH.ME)
      .pipe(
        tap((user) => {
          if (!user) {
            this.router.navigate(['/auth/login']);
            return;
          }
          this.currentUser.set(user)
        }),
        catchError((err) => {
          this.logout();
          return of(null);
        })
      );
  }
  saveToken(token: string): void {
    sessionStorage.setItem(this.STORAGE_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.STORAGE_KEY);
  }

  clearSession(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
  }
}