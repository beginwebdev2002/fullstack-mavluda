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
import { ImagePopupComponent, ListViewComponent, ListViewColumn } from "@shared/ui";
import { convertFormData, excludeFormDataProperties } from "@shared/lib/object";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-gallery",
  standalone: true,
  imports: [CommonModule, FormsModule, GalleryFormComponent, GalleryCardComponent, ImagePopupComponent, ListViewComponent],
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

  images = this.galleryService.images;

  filters = signal<ImageCategory[]>(GALLERY_CATEGORIES);
  activeFilter = signal<ImageCategory>(GalleryCategories.ALL);

  columns = signal<ListViewColumn[]>([
    { key: 'title', label: 'File Info', type: 'text' },
    { key: 'category', label: 'Category', type: 'badge' },
    { key: 'createdAt', label: 'Date', type: 'date' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ]);

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
      category: GalleryCategories.VISAGE, // Default
      status: "draft",
      alt: "",
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

  saveImage(event: { data: any; file: File | null }) {
    const { data: image, file } = event;
    const args: any[] = [{ ...image }];
    if (file) args.push(file);
    const formData = excludeFormDataProperties(convertFormData(...args), ["id", "createdAt", "updatedAt"]);

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
    this.selectedImage.set(linkServerConvert(imageUrl));
  }

  closeImageModal() {
    this.selectedImage.set(null);
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
