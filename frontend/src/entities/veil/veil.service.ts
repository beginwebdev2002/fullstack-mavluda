import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { API_ENDPOINTS } from "@core/constants";
import { Veil } from "@features/veil";
import { deleteArrayItemById, formDataExcludeProperty } from "@shared/lib";
import { Observable, tap } from "rxjs";

@Injectable()
export class VeilService {
  private http = inject(HttpClient);

  // State
  private _veils = signal<Veil[]>([]);
  veils = this._veils.asReadonly();

  getCount(): Observable<number> {
    return this.http.get<number>(`${API_ENDPOINTS.VEILS.BASE}/count`);
  }

  getVeils(): Observable<Veil[]> {
    return this.http
      .get<Veil[]>(API_ENDPOINTS.VEILS.BASE)
      .pipe(tap((veils) => this._veils.set(veils)));
  }

  getVeil(id: string): Observable<Veil> {
    return this.http.get<Veil>(API_ENDPOINTS.VEILS.URL_BY_ID(id));
  }

  createVeil(veil: Omit<Veil, "id"> | FormData): Observable<Veil> {
    return this.http
      .post<Veil>(API_ENDPOINTS.VEILS.BASE, veil)
      .pipe(
        tap((newVeil) => this._veils.update((veils) => [...veils, newVeil])),
      );
  }

  updateVeil(id: string, veil: FormData): Observable<Veil> {
    const updatedVeil = formDataExcludeProperty(veil, [
      "id",
      "createdAt",
      "updatedAt",
    ]);
    return this.http
      .put<Veil>(API_ENDPOINTS.VEILS.URL_BY_ID(id), veil)
      .pipe(
        tap((updatedVeil) =>
          this._veils.update((veils) =>
            veils.map((v) => (v.id === id ? updatedVeil : v)),
          ),
        ),
      );
  }

  deleteVeil(id: string): Observable<void> {
    this.deleteItemById(id);
    return this.http
      .delete<void>(API_ENDPOINTS.VEILS.URL_BY_ID(id))
      .pipe(
        tap(() =>
          this._veils.update((veils) => veils.filter((v) => v.id !== id)),
        ),
      );
  }

  private deleteItemById(id: string) {
    this._veils.set(deleteArrayItemById<Veil>(id, this.veils()));
  }
}
