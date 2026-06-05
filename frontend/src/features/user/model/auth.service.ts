import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SigninFormModel, SignupFormModel } from '@features/auth';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, User } from '../../../entities/user/model/user.model';
import { API_ENDPOINTS } from '@src/core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
   signin(body: SigninFormModel) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, body)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.setSession(response.access_token, response.user);
          this.router.navigate(['/user/home']);
        }
      })
    );
  }

  signup(body: Partial<SignupFormModel>) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, body)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  refreshToken() {
    return this.http.get<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }
  me(): Observable<User> {
    const token = sessionStorage.getItem('token');
    if(!token) return of(null);
    return this.http.get<User>(API_ENDPOINTS.AUTH.ME);
  }

  private setSession(token: string, userPayload: User) {
    sessionStorage.setItem('token', token);
  }
}
