
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { TelegramService } from './telegram.service';
import { API_ENDPOINTS } from '@shared/api/api-endpoints';
import { User } from '@shared/models/user.model';

export type UserRole = 'admin' | 'client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private telegramService = inject(TelegramService);


  currentUserRole = signal<UserRole>('client');
  isGlobalLoading = signal<boolean>(true);
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor() {
    // Initial check is done in AppComponent
  }

  toggleRole() {
    this.currentUserRole.update(role => role === 'admin' ? 'client' : 'admin');
  }

  async checkTelegramAuth() {
    this.isGlobalLoading.set(true);

    if (this.telegramService.initData) {
      console.log('Telegram Context Detected. Attempting Auto-Login...');
      
      try {
        const success = await this.loginWithTelegram(this.telegramService.initData);
        if (success) {
           this.isAuthenticated.set(true);
           // Role logic would come from backend User object. 
           // For now, defaulting to client unless specific condition (or from response)
           this.router.navigate(['/user/home']); 
        } else {
           this.isAuthenticated.set(false);
           this.router.navigate(['/auth']);
        }
      } catch (error) {
        console.error('Telegram Login Error:', error);
        this.isAuthenticated.set(false);
        this.router.navigate(['/auth']);
      }
    } else {
      console.log('No Telegram Context. Showing Standard Login.');
      this.isAuthenticated.set(false);
      setTimeout(() => {
         if (this.router.url === '/') {
           this.router.navigate(['/auth']);
         }
         this.isGlobalLoading.set(false);
      }, 1500);
    }
    
    this.isGlobalLoading.set(false);
  }

  async loginWithTelegram(initData: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean; user: User }>(`${API_ENDPOINTS.Auth}/telegram`, { initData })
      );
      
      if (response.success && response.user) {
        this.currentUser.set(response.user);
        
        // Simple role check based on roles array from backend
        if (response.user.roles.includes('admin')) {
          this.currentUserRole.set('admin');
        } else {
          this.currentUserRole.set('client');
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login request failed', error);
      return false;
    }
  }

  login() {
    // Manual Login (Web)
    this.isAuthenticated.set(true);
    return true;
  }
}
