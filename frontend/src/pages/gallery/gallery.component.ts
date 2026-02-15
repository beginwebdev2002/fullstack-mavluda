import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GalleryService } from "@entities/gallery";
import { Gallery, ImageCategory } from "@shared/models";

@Component({
  selector: "app-gallery",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  private galleryService = inject(GalleryService);

  isDragging = signal(false);
  isModalOpen = signal(false);
  viewMode = signal<"grid" | "list">("grid");
  selectedImage = signal<string | null>(null);
  isImageLoading = signal(false);

  images = this.galleryService.images;

  filters: ImageCategory[] = [
    "All",
    "Visage",
    "Medical Spa",
    "Bridal Veils",
    "Interior",
    "Product",
  ];
  activeFilter = signal<ImageCategory>("All");

  filteredImages = computed(() => {
    const filter = this.activeFilter();
    if (filter === "All") {
      return this.images();
    }
    return this.images().filter((img) => img.category === filter);
  });

  currentImage!: Gallery;

  ngOnInit() {
    this.galleryService.getImages().subscribe();
  }

  getEmptyImage(): Gallery {
    return {
      id: "",
      imageUrl: "",
      title: "",
      filename: "",
      category: "Visage", // Default
      createdAt: "",
      status: "draft",
      alt: "",
      tags: [],
    };
  }

  openAddModal() {
    this.currentImage = this.getEmptyImage();
    this.isModalOpen.set(true);
  }

  openModal(image: Gallery) {
    this.currentImage = { ...image }; // Create a copy for editing
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveImage() {
    if (!this.currentImage.id) {
      // New image
      // Backend handles createdAt
      this.galleryService.createImage(this.currentImage).subscribe(() => {
        this.closeModal();
      });
    } else {
      // Update existing
      this.galleryService
        .updateImage(this.currentImage.id, this.currentImage)
        .subscribe(() => {
          this.closeModal();
        });
    }
  }

  deleteImage(id: string) {
    if (confirm("Are you sure you want to delete this image?")) {
      this.galleryService.deleteImage(id).subscribe();
    }
  }

  openImageModal(imageUrl: string) {
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      console.log(`${files.length} files dropped`);
      // Here you would handle the file upload logic
    }
  }
}
