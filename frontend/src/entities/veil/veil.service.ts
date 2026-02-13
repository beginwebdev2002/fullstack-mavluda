import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Veil } from '@features/veil/model/veil.data';

@Injectable({
  providedIn: 'root'
})
export class VeilService {
  private http = inject(HttpClient);
  private apiUrl = '/veils';

  // State
  private _veils = signal<Veil[]>([]);
  veils = this._veils.asReadonly();

  getVeils(): Observable<Veil[]> {
    return this.http.get<Veil[]>(this.apiUrl).pipe(
      tap(veils => this._veils.set(veils))
    );
  }

  getVeil(id: string): Observable<Veil> {
    return this.http.get<Veil>(`${this.apiUrl}/${id}`);
  }

  createVeil(veil: Omit<Veil, 'id'> | FormData): Observable<Veil> {
    return this.http.post<Veil>(this.apiUrl, veil).pipe(
      tap(newVeil => this._veils.update(veils => [...veils, newVeil]))
    );
  }

  updateVeil(id: string, veil: Partial<Veil> | FormData): Observable<Veil> {
    return this.http.put<Veil>(`${this.apiUrl}/${id}`, veil).pipe(
      tap(updatedVeil => this._veils.update(veils => 
        veils.map(v => v.id === id ? updatedVeil : v)
      ))
    );
  }

  deleteVeil(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this._veils.update(veils => 
        veils.filter(v => v.id !== id)
      ))
    );
  }
}
