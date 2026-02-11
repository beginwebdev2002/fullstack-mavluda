import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AdminSettings } from './admin-settings.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  private http = inject(HttpClient);
  private apiUrl = '/admin-settings'; // Interceptor likely handles base URL

  // State
  private _settings = signal<AdminSettings | null>(null);
  settings = this._settings.asReadonly();

  getSettings(): Observable<AdminSettings> {
    return this.http.get<AdminSettings>(this.apiUrl).pipe(
      tap(settings => this._settings.set(settings))
    );
  }

  createSettings(settings: Omit<AdminSettings, 'id'>): Observable<AdminSettings> {
    return this.http.post<AdminSettings>(this.apiUrl, settings).pipe(
      tap(newSettings => this._settings.set(newSettings))
    );
  }

  updateSettings(settings: Partial<AdminSettings>): Observable<AdminSettings> {
    return this.http.put<AdminSettings>(this.apiUrl, settings).pipe(
      tap(updatedSettings => this._settings.set(updatedSettings))
    );
  }

  deleteSettings(): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl).pipe(
        tap(() => this._settings.set(null))
    );
  }
}
