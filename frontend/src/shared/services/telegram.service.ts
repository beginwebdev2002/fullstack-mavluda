import { Injectable, signal } from '@angular/core';
import { TelegramUser, TelegramWebApp } from '../../types/telegram';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private webApp: TelegramWebApp | null = null;
  public user = signal<TelegramUser | null>(null);

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      this.webApp = window.Telegram.WebApp;
      if (this.webApp.initDataUnsafe?.user) {
        this.user.set(this.webApp.initDataUnsafe.user);
      }
    }
  }

  get initData(): string {
    return this.webApp?.initData || '';
  }

  ready(): void {
    this.webApp?.ready();
  }

  expand(): void {
    this.webApp?.expand();
  }
}
