import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryService } from "@entities/gallery";
import { AdminSettingsService } from "@entities/admin-settings";
import { linkServerConvert } from "@shared/lib";
import { environment } from "@environments/environment";
import { ImagePopupComponent } from "@shared/ui";

@Component({
  selector: "app-portfolio-page",
  standalone: true,
  imports: [CommonModule, ImagePopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioPageComponent implements OnInit {
  private galleryService = inject(GalleryService);
  private adminSettingsService = inject(AdminSettingsService);
  private env = signal(environment);

  galleryImages = this.galleryService.images;
  selectedImage = signal<string | null>(null);

  // Dynamic filters from AdminSettings + "All Works"
  filters = computed<string[]>(() => {
    const cats = this.adminSettingsService.settings()?.galleryCategories;
    return ["All Works", ...(cats && cats.length > 0 ? cats : [])];
  });

  activeFilter = signal("All Works");

  portfolioItems = computed(() =>
    this.galleryImages().map((img) => ({
      id: img.id,
      imageUrl: this.getImageUrl(img.imageUrl),
      category: img.category,
      title: img.title,
      description: img.alt || img.title,
      statusTag: img.status === "published" ? "Available" : undefined,
      aspectClass: this.getAspectClass(img.id ?? ""),
    }))
  );

  filteredItems = computed(() => {
    const filter = this.activeFilter();
    const items = this.portfolioItems();
    return filter === "All Works"
      ? items
      : items.filter((item) => item.category === filter);
  });

  ngOnInit() {
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
    this.galleryService.getImages().subscribe();
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return "assets/placeholder-gallery.png";
    const isAbsolute =
      path.startsWith("http") ||
      path.startsWith("blob") ||
      path.includes(this.env().apiUrl);
    return isAbsolute ? path : linkServerConvert(path);
  }

  private getAspectClass(id: string): string {
    const hash = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const aspects = [
      "aspect-[4/5]",
      "aspect-[2/3]",
      "aspect-[5/4]",
      "aspect-[3/4]",
      "aspect-square",
    ];
    return aspects[hash % aspects.length];
  }

  openImageModal(imageUrl: string | undefined) {
    if (!imageUrl) return;
    this.selectedImage.set(this.getImageUrl(imageUrl));
  }

  closeImageModal() {
    this.selectedImage.set(null);
  }
}
