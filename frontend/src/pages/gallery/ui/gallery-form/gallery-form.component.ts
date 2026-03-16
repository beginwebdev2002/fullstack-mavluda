import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { Gallery, ImageCategory } from "@shared/models";
import { linkServerConvert } from "@shared/lib";
import { galleryFormData, galleryValidationSchema, resetGalleryData } from "@features/gallery";

@Component({
  selector: "app-gallery-form",
  standalone: true,
  imports: [CommonModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./gallery-form.component.html",
})
export class GalleryFormComponent implements OnInit {
  image = input.required<Gallery>();
  filters = input.required<ImageCategory[]>();
  
  save = output<{ data: any; file: File | null }>();
  cancel = output<void>();

  galleryModel = signal<Gallery>(galleryFormData);
  galleryForm = form<Gallery>(this.galleryModel, galleryValidationSchema);
  selectedFile = signal<File | null>(null);
  previewImage = linkedSignal(() => {
    const img = this.image()?.imageUrl;
    return img ? linkServerConvert(img) : null;
  });
  isEditMode = signal(false);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.image() && this.image().id) {
      this.isEditMode.set(true);
      this.previewImage.set(linkServerConvert(this.image().imageUrl));
      this.galleryModel.set(this.image());
    } else {
      this.isEditMode.set(false);
      this.galleryModel.set(galleryFormData);
    }
  }

  resetForm() {
    this.isEditMode.set(false);
    this.selectedFile.set(null);
    this.previewImage.set(null);
    this.galleryModel.set(resetGalleryData);
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
    if (this.galleryForm().valid()) {
      this.save.emit({
        data: this.galleryForm().value(),
        file: this.selectedFile(),
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  formatCategory(category: string): string {
    if (!category || category === 'all') return "";
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
