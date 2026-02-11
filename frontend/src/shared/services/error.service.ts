import { Injectable, signal } from '@angular/core';

export interface AppError {
  message: string;
  statusCode?: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = signal<AppError | null>(null);

  readonly error = this._error.asReadonly();

  showError(message: string | string[], statusCode?: number) {
    const formattedMessage = Array.isArray(message) ? message.join('\n') : message;
    this._error.set({
      message: formattedMessage,
      statusCode,
      timestamp: Date.now()
    });
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  clearError() {
    this._error.set(null);
  }
}
