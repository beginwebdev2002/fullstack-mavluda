import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Gallery, ImageCategory } from "@shared/models";

@Component({
  selector: "app-gallery-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./gallery-form.component.html",
})
export class GalleryFormComponent implements OnInit {
  image = input.required<Gallery>();
  filters = input.required<ImageCategory[]>();
  
  save = output<{ image: Gallery; file: File | null }>();
  cancel = output<void>();

  currentImage!: Gallery;

  ngOnInit() {
    this.currentImage = { ...this.image() };
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      if (!this.currentImage.id) {
        this.currentImage.filename = file.name;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentImage.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveImage() {
    this.save.emit({ image: this.currentImage, file: this.selectedFile });
  }

  closeModal() {
    this.cancel.emit();
  }

  formatCategory(category: string): string {
    if (!category) return "";
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
