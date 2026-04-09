import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User, AuthResponse } from './model/user.model';
import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINTS } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // State
  private _currentUser = signal<User | null>(this.getUserFromStorage());
  
  // Public Signals
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
     // Optional: Validate token expiration on init
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap(response => this.setSession(response.access_token))
    );
  }

  register(data: any) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data).pipe(
      tap(response => this.setSession(response.access_token))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  private setSession(token: string) {
    localStorage.setItem('token', token);
    const user = this.decodeToken(token);
    this._currentUser.set(user);
  }

  private getUserFromStorage(): User | null {
    const token = localStorage.getItem('token');
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  private decodeToken(token: string): User | null {
    try {
      const decoded: any = jwtDecode(token);
      // Map decoded payload to User interface
      // Payload: { sub: id, email, role, ... }
      return {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        firstName: decoded.firstName || '', // If included in token
        lastName: decoded.lastName,
        photoUrl: decoded.photoUrl
      };
    } catch (e) {
      return null;
    }
  }
}
