import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, signal, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Veil } from '../../../entities/veil/veil.model';

@Component({
  selector: 'app-veil-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './veil-form.component.html'
})
export class VeilFormComponent implements OnInit, OnChanges {
  @Input() veil: Veil | null = null;
  @Output() save = new EventEmitter<{ data: any, file: File | null }>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  veilForm!: FormGroup;
  selectedFile = signal<File | null>(null);
  previewImage = signal<string | null>(null);
  isEditMode = signal(false);

  constructor() {
    this.initForm();
  }

  ngOnInit() {
    if (this.veil) {
      this.populateForm(this.veil);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['veil'] && changes['veil'].currentValue) {
       this.populateForm(changes['veil'].currentValue);
    } else if (changes['veil'] && !changes['veil'].currentValue) {
       this.resetForm();
    }
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

  populateForm(veil: Veil) {
    this.isEditMode.set(true);
    this.previewImage.set(veil.images && veil.images.length > 0 ? veil.images[0] : null);
    
    this.veilForm.patchValue({
        name: veil.name,
        price: veil.price,
        rentalPrice: veil.rentalPrice || 0,
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
  }

  resetForm() {
    this.isEditMode.set(false);
    this.selectedFile.set(null);
    this.previewImage.set(null);
    this.veilForm.reset({
        name: '',
        price: 0,
        rentalPrice: 0,
        stock: 0,
        category: 'Bridal',
        isAvailable: true,
        description: ''
    });
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

  onSubmit() {
    if (this.veilForm.valid) {
      this.save.emit({
        data: this.veilForm.value,
        file: this.selectedFile()
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
