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
import { GalleryService, GALLERY_CATEGORIES, GalleryCategories } from "@entities/gallery";
import { Gallery, ImageCategory } from "@shared/models";
import { GalleryFormComponent } from "./ui/gallery-form/gallery-form.component";
import { GalleryCardComponent } from "./ui/gallery-card/gallery-card.component";
import { convertFormData } from "@shared/lib/object";

@Component({
  selector: "app-gallery",
  standalone: true,
  imports: [CommonModule, FormsModule, GalleryFormComponent, GalleryCardComponent],
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

  filters = signal<ImageCategory[]>(GALLERY_CATEGORIES);
  activeFilter = signal<ImageCategory>(GalleryCategories.ALL);

  filteredImages = computed(() => {
    const filter = this.activeFilter();
    if (filter === GalleryCategories.ALL) {
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
      category: GalleryCategories.VISAGE, // Default
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

  saveImage(event: { image: Gallery; file: File | null }) {
    const { image, file } = event;
    const args: any[] = [{ ...image }];
    if (file) args.push(file);
    const formData = convertFormData(...args);

    if (!image.id) {
      // New image
      this.galleryService.createImage(formData).subscribe(() => {
        this.closeModal();
      });
    } else {
      // Update existing
      this.galleryService
        .updateImage(image.id, formData)
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
