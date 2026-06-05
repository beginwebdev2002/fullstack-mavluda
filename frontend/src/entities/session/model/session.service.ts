import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@entities/user';
import { Roles } from '../constants/session';
import { API_ENDPOINTS } from '@src/core/constants';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === Roles.ADMIN);

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
    this.currentUser.set(null);
    this.http.post(API_ENDPOINTS.AUTH.LOGOUT, {}).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  loadProfile(): Observable<User> {
    const token = sessionStorage.getItem('token');
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
}