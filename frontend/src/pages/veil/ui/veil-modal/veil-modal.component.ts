import {
  Component,
  input,
  output,
  signal,
  effect,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Veil } from "@features/veil";

@Component({
  selector: "app-veil-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./veil-modal.component.html",
})
export class VeilModalComponent {
  veil = input<Veil | null>(null);
  save = output<FormData>();
  cancel = output<void>();

  constructor() {
    effect(() => {
      const value = this.veil();
      if (value) {
        this.currentVeilId.set(value.id);
        this.name.set(value.name);
        this.price.set(value.price);
        this.rentalPrice.set(value.rentalPrice || 0);
        this.stock.set(value.stock);
        this.sku.set(value.sku || "");
        this.silhouette.set(value.silhouette || "");
        this.neckline.set(value.neckline || "");
        this.fabric.set(value.fabric || "");
        this.trainLength.set(value.trainLength || "");
        this.category.set(value.category || "Bridal");
        this.description.set(value.description || "");
        this.isAvailable.set(value.isAvailable);
        this.existingImages.set(value.images || []);

        if (value.images && value.images.length > 0) {
          this.previewImage.set(value.images[0]);
        } else {
          this.previewImage.set(null);
        }
      } else {
        this.resetForm();
      }
    });
  }

  // Form Signals
  currentVeilId = signal<string | null>(null);
  name = signal("");
  price = signal(0);
  rentalPrice = signal(0);
  stock = signal(0);
  sku = signal("");
  silhouette = signal("");
  neckline = signal("");
  fabric = signal("");
  trainLength = signal("");
  category = signal("Bridal");
  description = signal("");
  isAvailable = signal(true);

  // File Upload Signals
  selectedFile = signal<File | null>(null);
  previewImage = signal<string | null>(null);
  existingImages = signal<string[]>([]);

  isEditMode = computed(() => !!this.currentVeilId());

  resetForm() {
    this.currentVeilId.set(null);
    this.name.set("");
    this.price.set(0);
    this.rentalPrice.set(0);
    this.stock.set(0);
    this.sku.set("");
    this.silhouette.set("");
    this.neckline.set("");
    this.fabric.set("");
    this.trainLength.set("");
    this.category.set("Bridal");
    this.description.set("");
    this.isAvailable.set(true);
    this.selectedFile.set(null);
    this.previewImage.set(null);
    this.existingImages.set([]);
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

  onSave() {
    const formData = new FormData();

    // Append fields
    formData.append("name", this.name());
    formData.append("price", this.price().toString());
    formData.append("rentalPrice", this.rentalPrice().toString());
    formData.append("stock", this.stock().toString());
    formData.append("sku", this.sku());
    formData.append("silhouette", this.silhouette());
    formData.append("neckline", this.neckline());
    formData.append("fabric", this.fabric());
    formData.append("trainLength", this.trainLength());
    formData.append("category", this.category());
    formData.append("description", this.description());

    // Handle boolean for FormData (send 'true'/'false' string)
    formData.append("isAvailable", String(this.isAvailable()));

    // Append new file if selected
    if (this.selectedFile()) {
      formData.append("files", this.selectedFile()!);
    }

    // Handle existing images for updates
    // If we are in edit mode and have existing images, we might want to keep them.
    // The backend appends new files.
    // If we want to strictly sync, we should pass back the existing images that shouldn't be deleted.
    // For now, let's pass all existing images back.
    if (this.currentVeilId()) {
      const images = this.existingImages();
      if (images.length > 0) {
        images.forEach((img) => formData.append("images", img));
      }
    }

    this.save.emit(formData);
  }

  onCancel() {
    this.cancel.emit();
  }
}
