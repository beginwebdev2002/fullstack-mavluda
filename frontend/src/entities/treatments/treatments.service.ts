import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { TreatmentItem } from "@features/treatments";
import { deleteArrayItemById, deleteProperties, excludeFormDataProperties, formDataExcludeProperty } from "@shared/lib";
import { API_ENDPOINTS } from "@core/constants";

@Injectable()
export class TreatmentsService {
  private http = inject(HttpClient);

  // State
  private _treatments = signal<TreatmentItem[]>([]);
  treatments = this._treatments.asReadonly();

  getCount(): Observable<number> {
    return this.http.get<number>(API_ENDPOINTS.TREATMENTS.COUNT);
  }

  getTreatments(): Observable<TreatmentItem[]> {
    return this.http
      .get<TreatmentItem[]>(API_ENDPOINTS.TREATMENTS.URL)
      .pipe(tap((treatments) => this._treatments.set(treatments)));
  }

  getTreatment(id: string): Observable<TreatmentItem> {
    return this.http.get<TreatmentItem>(API_ENDPOINTS.TREATMENTS.URL_BY_ID(id));
  }

  createTreatment(
    treatment: FormData,
  ): Observable<TreatmentItem> {
    return this.http
      .post<TreatmentItem>(API_ENDPOINTS.TREATMENTS.URL, treatment)
      .pipe(
        tap((newTreatment) =>
          this._treatments.update((treatments) => [
            ...treatments,
            newTreatment,
          ]),
        ),
      );
  }

  updateTreatment(id: string, treatment: FormData): Observable<TreatmentItem> {
    const updatedTreatment = formDataExcludeProperty(treatment, [
      "id",
      "createdAt",
      "updatedAt",
    ]);
    const url = API_ENDPOINTS.TREATMENTS.URL_BY_ID(id);
    console.log(url);
    return this.http
      .put<TreatmentItem>(
        url,
        updatedTreatment,
      )
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
    this._treatments.set(
      deleteArrayItemById<TreatmentItem>(id, this.treatments()),
    );
  }
}
