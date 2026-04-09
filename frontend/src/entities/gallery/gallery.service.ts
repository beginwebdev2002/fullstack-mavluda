import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Gallery } from "@shared/models";
import { API_ENDPOINTS } from "@core/constants";

import { API_ENDPOINTS } from "@core/constants";

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  private http = inject(HttpClient);
  private apiUrl = API_ENDPOINTS.GALLERY.BASE;

  // State
  private _images = signal<Gallery[]>([]);
  images = this._images.asReadonly();

  getImages(): Observable<Gallery[]> {
    return this.http
      .get<Gallery[]>(this.apiUrl)
      .pipe(tap((images) => this._images.set(images)));
  }

  getImage(id: string): Observable<Gallery> {
    return this.http.get<Gallery>(API_ENDPOINTS.GALLERY.URL_BY_ID(id));
  }

  // Use this for both create and update if sending full object, or create specific methods
  createImage(formData: FormData): Observable<Gallery> {
    return this.http
      .post<Gallery>(this.apiUrl, formData)
      .pipe(
        tap((newImage) => this._images.update((imgs) => [newImage, ...imgs])),
      );
  }

  updateImage(id: string, formData: FormData): Observable<Gallery> {
    return this.http
      .put<Gallery>(API_ENDPOINTS.GALLERY.URL_BY_ID(id), formData)
      .pipe(
        tap((updatedImage) =>
          this._images.update((imgs) =>
            imgs.map((img) => (img.id === id ? updatedImage : img)),
          ),
        ),
      );
  }

  deleteImage(id: string): Observable<void> {
    return this.http
      .delete<void>(API_ENDPOINTS.GALLERY.URL_BY_ID(id))
      .pipe(
        tap(() =>
          this._images.update((imgs) => imgs.filter((img) => img.id !== id)),
        ),
      );
  }
}
