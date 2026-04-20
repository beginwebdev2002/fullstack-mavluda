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
import { GalleryService, GalleryCategories } from "@entities/gallery";
import { AdminSettingsService } from "@entities/admin-settings";
import { Gallery, ImageCategory } from "@shared/models";
import { GalleryFormComponent } from "./ui/gallery-form/gallery-form.component";
import { ImagePopupComponent, ListViewComponent, ListViewColumn, CardViewComponent, CardViewConfig } from "@shared/ui";
import { convertFormData, excludeFormDataProperties } from "@shared/lib/object";
import { linkServerConvert } from "@shared/lib";
import { environment } from "@environments/environment";

@Component({
  selector: "app-gallery",
  standalone: true,
  imports: [CommonModule, FormsModule, GalleryFormComponent, CardViewComponent, ImagePopupComponent, ListViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  private galleryService = inject(GalleryService);
  private adminSettingsService = inject(AdminSettingsService);
  env = signal(environment);

  isDragging = signal(false);
  isModalOpen = signal(false);
  viewMode = signal<"grid" | "list">("grid");
  selectedImage = signal<string | null>(null);

  images = this.galleryService.images;

  // Dynamic categories from admin settings.
  // Falls back to ['all'] if settings not loaded yet.
  filters = computed<ImageCategory[]>(() => {
    const settings = this.adminSettingsService.settings();
    const cats = settings?.galleryCategories ?? [];
    return ['all', ...cats] as ImageCategory[];
  });

  activeFilter = signal<ImageCategory>(GalleryCategories.ALL);

  columns = signal<ListViewColumn[]>([
    { key: 'title', label: 'File Info', type: 'text' },
    { key: 'category', label: 'Category', type: 'badge' },
    { key: 'createdAt', label: 'Date', type: 'date' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ]);

  galleryCardConfig: CardViewConfig = {
    imageField: 'imageUrl',
    titleField: 'title',
    subtitleField: 'category',
    topRightField: 'createdAt',
    topRightType: 'date',
    details: [
      { label: 'Status', field: 'status', type: 'status' },
      { label: 'Created At', field: 'createdAt', type: 'date' }
    ]
  };

  filteredImages = computed(() => {
    const filter = this.activeFilter();
    if (filter === GalleryCategories.ALL) {
      return this.images();
    }
    return this.images().filter((img) => img.category === filter);
  });

  currentImage!: Gallery;

  ngOnInit() {
    // Load settings if not yet cached
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
    this.galleryService.getImages().subscribe();
  }

  getEmptyImage(): Gallery {
    const firstCat = this.filters().find(f => f !== 'all') ?? GalleryCategories.ALL;
    return {
      id: "",
      imageUrl: "",
      title: "",
      category: firstCat,
      status: "draft",
      alt: "",
    };
  }

  openAddModal() {
    this.currentImage = this.getEmptyImage();
    this.isModalOpen.set(true);
  }

  openModal(image: Gallery) {
    this.currentImage = { ...image };
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
      this.galleryService.createImage(formData).subscribe(() => {
        this.closeModal();
      });
    } else {
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
    if (!imageUrl) return;
    const isAbsolute = imageUrl.startsWith("http") || imageUrl.startsWith("blob") || imageUrl.includes(this.env().apiUrl);
    this.selectedImage.set(isAbsolute ? imageUrl : linkServerConvert(imageUrl));
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
    }
  }
}
