import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Treatment } from "@features/treatments";
import { deleteArrayItemById, formDataExcludeProperty } from "@shared/lib";
import { API_ENDPOINTS } from "@core/constants";

@Injectable()
export class TreatmentsService {
  private http = inject(HttpClient);

  // State
  private _treatments = signal<Treatment[]>([]);
  treatments = this._treatments.asReadonly();

  getTreatments(): Observable<Treatment[]> {
    return this.http
      .get<Treatment[]>(API_ENDPOINTS.TREATMENTS.BASE)
      .pipe(tap((treatments) => this._treatments.set(treatments)));
  }

  getTreatment(id: string): Observable<Treatment> {
    return this.http.get<Treatment>(API_ENDPOINTS.TREATMENTS.URL_BY_ID(id));
  }

  createTreatment(
    treatment: Omit<Treatment, "id"> | FormData,
  ): Observable<Treatment> {
    return this.http
      .post<Treatment>(API_ENDPOINTS.TREATMENTS.BASE, treatment)
      .pipe(
        tap((newTreatment) =>
          this._treatments.update((treatments) => [
            ...treatments,
            newTreatment,
          ]),
        ),
      );
  }

  updateTreatment(id: string, treatment: FormData): Observable<Treatment> {
    const updatedTreatment = formDataExcludeProperty(treatment, [
      "id",
      "createdAt",
      "updatedAt",
    ]);
    return this.http
      .put<Treatment>(API_ENDPOINTS.TREATMENTS.URL_BY_ID(id), treatment)
      .pipe(
        tap((updatedTreatment) =>
          this._treatments.update((treatments) =>
            treatments.map((t) => (t.id === id ? updatedTreatment : t)),
          ),
        ),
      );
  }

  deleteTreatment(id: string): Observable<void> {
    this.deleteItemById(id);
    return this.http
      .delete<void>(API_ENDPOINTS.TREATMENTS.URL_BY_ID(id))
      .pipe(
        tap(() =>
          this._treatments.update((treatments) =>
            treatments.filter((t) => t.id !== id),
          ),
        ),
      );
  }

  private deleteItemById(id: string) {
    this._treatments.set(deleteArrayItemById<Treatment>(id, this.treatments()));
  }
}
