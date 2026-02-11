import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Gallery } from './gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private http = inject(HttpClient);
  private apiUrl = '/gallery';

  // State
  private _images = signal<Gallery[]>([]);
  images = this._images.asReadonly();

  getImages(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl).pipe(
      tap(images => this._images.set(images))
    );
  }

  getImage(id: string): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiUrl}/${id}`);
  }

  // Use this for both create and update if sending full object, or create specific methods
  createImage(image: Omit<Gallery, 'id' | 'createdAt'>): Observable<Gallery> {
    return this.http.post<Gallery>(this.apiUrl, image).pipe(
      tap(newImage => this._images.update(imgs => [newImage, ...imgs]))
    );
  }

  updateImage(id: string, image: Partial<Gallery>): Observable<Gallery> {
    return this.http.put<Gallery>(`${this.apiUrl}/${id}`, image).pipe(
      tap(updatedImage => this._images.update(imgs => 
        imgs.map(img => img.id === id ? updatedImage : img)
      ))
    );
  }

  deleteImage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this._images.update(imgs => 
        imgs.filter(img => img.id !== id)
      ))
    );
  }
}
