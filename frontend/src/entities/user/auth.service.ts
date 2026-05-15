import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User, AuthResponse } from './model/user.model';
import { jwtDecode } from 'jwt-decode';

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

  signin(credentials: any) {
    return this.http.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => {
        if(response && response.access_token) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  signup(data: any) {
    return this.http.post<AuthResponse>('/auth/register', data).pipe(
      tap(response => {
        if(response && response.access_token) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  refreshToken() {
    return this.http.post<AuthResponse>('/auth/refresh', {}, { withCredentials: true }).pipe(
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

  private setSession(token: string, userPayload?: any) {
    sessionStorage.setItem('token', token);
    const user = userPayload || this.decodeToken(token);
    this._currentUser.set(user);
  }

  private getUserFromStorage(): User | null {
    if (typeof sessionStorage === 'undefined') return null;
    const token = sessionStorage.getItem('token');
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
