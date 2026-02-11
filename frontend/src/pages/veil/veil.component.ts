
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeilService } from '../../entities/veil/veil.service';
import { Veil } from '../../entities/veil/veil.model';

@Component({
  selector: 'app-veil-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './veil.component.html',
  styleUrls: ['./veil.component.scss']
})
export class VeilPageComponent implements OnInit {
  private veilService = inject(VeilService);
  
  veils = this.veilService.veils;

  selectedImage = signal<string | null>(null);
  
  // Edit Modal State
  isEditModalOpen = signal(false);
  isImageLoading = signal(false);
  tempVeil: Veil = this.getEmptyVeil();

  ngOnInit() {
    this.veilService.getVeils().subscribe();
  }

  getEmptyVeil(): Veil {
    return {
       id: '', // Backend uses string IDs
       name: '',
       sku: '',
       silhouette: '',
       neckline: '',
       fabric: '',
       trainLength: '',
       price: 0,
       stock: 0,
       images: [],
       category: 'Bridal', // Default
       isAvailable: true,
       description: ''
    };
  }

  // Edit Methods
  openAddModal() {
     this.tempVeil = this.getEmptyVeil();
     this.isEditModalOpen.set(true);
  }

  openEditModal(veil: Veil) {
     // Clone deep enough for images array
     this.tempVeil = { ...veil, images: [...veil.images] };
     this.isEditModalOpen.set(true);
  }

  closeEditModal() {
     this.isEditModalOpen.set(false);
  }

  saveVeil() {
     // Ensure at least one image if possible, or handle empty
     if (!this.tempVeil.id) {
        // Create - id is empty string
        this.veilService.createVeil(this.tempVeil).subscribe(() => {
           this.closeEditModal();
        });
     } else {
        // Update
        this.veilService.updateVeil(this.tempVeil.id, this.tempVeil).subscribe(() => {
           this.closeEditModal();
        });
     }
  }

  // Image Modal Methods
  openImageModal(imageUrl: string) {
    if (!imageUrl) return;
    this.selectedImage.set(imageUrl);
    this.isImageLoading.set(true);
  }

  closeImageModal() {
    this.selectedImage.set(null);
    this.isImageLoading.set(false);
  }

  onImageLoad() {
    this.isImageLoading.set(false);
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Update the tempVeil's image property to the base64 string for preview
            // Replace the first image or add if empty
            if (this.tempVeil.images.length > 0) {
               this.tempVeil.images[0] = e.target.result;
            } else {
               this.tempVeil.images = [e.target.result];
            }
        };
        reader.readAsDataURL(file);
    }
  }
}

