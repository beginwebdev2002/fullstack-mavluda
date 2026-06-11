import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SigninFormModel, SignupFormModel } from '@features/auth';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, User } from '@entities/user';
import { API_ENDPOINTS } from '@src/core/constants';
import { SessionService } from '@entities/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private session = inject(SessionService)
  
   signin(body: SigninFormModel) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN, body)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.session.setSession(response);
          this.router.navigate(['/user/home']);
          console.log('signin response', response);
          
        }
      })
    );
  }

  signup(body: Partial<SignupFormModel>) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, body)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.session.setSession(response);
          this.router.navigate(['/user/home']);
        }
      })
    );
  }

  refreshToken() {
    return this.http.get<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH)
    .pipe(
      tap(response => {
        if(response && response.access_token) {
          this.session.setSession(response);
        }
      })
    );
  }

}
