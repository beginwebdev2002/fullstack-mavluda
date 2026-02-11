
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VeilService } from '../../entities/veil/veil.service';
import { Veil } from '../../entities/veil/veil.model';

@Component({
  selector: 'app-veil-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './veil.component.html',
  styleUrls: ['./veil.component.scss']
})
export class VeilPageComponent implements OnInit {
  private veilService = inject(VeilService);
  private fb = inject(FormBuilder);

  formModel = signal<Veil>({
    id: '',
    name: '',
    price: 0,
    rentalPrice: 0,
    stock: 0,
    sku: '',
    silhouette: '',
    neckline: '',
    fabric: '',
    trainLength: '',
    category: 'Bridal',
    description: '',
    isAvailable: true,
    images: []
  });
  
  veils = this.veilService.veils;

  selectedImage = signal<string | null>(null);
  
  // Edit Modal State
  isEditModalOpen = signal(false);
  isImageLoading = signal(false);
  
  veilForm!: FormGroup;
  selectedFile = signal<File | null>(null);
  previewImage = signal<string | null>(null);
  currentVeilId = signal<string | null>(null);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.veilForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      rentalPrice: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      sku: [''],
      silhouette: [''],
      neckline: [''],
      fabric: [''],
      trainLength: [''],
      category: ['Bridal'],
      description: [''],
      isAvailable: [true]
    });
  }

  ngOnInit() {
    this.veilService.getVeils().subscribe();
  }



  // Edit Methods
  openAddModal() {
     this.currentVeilId.set(null);
     this.selectedFile.set(null);
     this.previewImage.set(null);
     this.veilForm.reset({
       name: '',
       price: 0,
       rentalPrice: 0,
       stock: 0,
       category: 'Bridal',
       isAvailable: true,
       description: '' // Check if description exists in form
     });
     this.isEditModalOpen.set(true);
  }

  openEditModal(veil: Veil) {
     this.currentVeilId.set(veil.id);
     this.selectedFile.set(null);
     // If veil has images, show the first one as preview
     this.previewImage.set(veil.images && veil.images.length > 0 ? veil.images[0] : null);
     
     this.veilForm.patchValue({
       name: veil.name,
       price: veil.price,
       rentalPrice: veil.rentalPrice || 0, // Ensure field exists in model
       stock: veil.stock,
       sku: veil.sku,
       silhouette: veil.silhouette,
       neckline: veil.neckline,
       fabric: veil.fabric,
       trainLength: veil.trainLength,
       category: veil.category,
       description: veil.description || '', 
       isAvailable: veil.isAvailable
     });
     this.isEditModalOpen.set(true);
  }

  closeEditModal() {
     this.isEditModalOpen.set(false);
  }

  saveVeil() {
     if (this.veilForm.invalid) return;

     const formValue = this.veilForm.value;
     
     // Create FormData if file is selected or simpler object if not?
     // Actually, backend now expects FormData for files, or JSON with numeric types.
     // But we modified service to accept FormData.
     // Let's use FormData always for simplicity when dealing with files,
     // or just use FormData for everything to be consistent with the "upload" capability.
     
     const formData = new FormData();
     Object.keys(formValue).forEach(key => {
        const value = formValue[key];
        if (value !== null && value !== undefined) {
             formData.append(key, value.toString());
        }
     });

     if (this.selectedFile()) {
        formData.append('files', this.selectedFile()!);
     }
     
     // IMPORTANT: For existing images, we might need to handle them.
     // If we are editing and NOT uploading a new file, we should probably keep existing images.
     // The backend logic: if new files, they are mapped. 
     // We also send 'images' from form if we want to keep them.
     // Current form logic doesn't explicitly track 'images' array in the form controls (except for display).
     // Ideally, we should add existing images to FormData if we want to keep them.
     // But `veilForm` doesn't have `images`.
     
     const currentId = this.currentVeilId();
     if (currentId) {
        // Validation for update: explicitly add existing images if no new file? 
        // Or if we want to keep them.
        // Let's assume for now we keep existing images by default on backend if not replaced.
        // But backend append new files to exists.
        
        // If we want to strictly sync, we should pass existing images.
        // Let's grab them from the original veil?
        const originalVeil = this.veils().find(v => v.id === currentId);
        if (originalVeil && originalVeil.images) {
            originalVeil.images.forEach(img => {
                formData.append('images', img);
            });
        }
        
        this.veilService.updateVeil(currentId, formData).subscribe(() => {
           this.closeEditModal();
        });
     } else {
        this.veilService.createVeil(formData).subscribe(() => {
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
        this.selectedFile.set(file);
        
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewImage.set(e.target.result);
        };
        reader.readAsDataURL(file);
    }
  }
}

