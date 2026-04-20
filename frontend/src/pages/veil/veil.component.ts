import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { environment } from "@environments/environment";
import { VeilService } from "@entities/veil";
import { AdminSettingsService } from "@entities/admin-settings";
import { Veil, veilFormData } from "@features/veil";
import { convertFormData } from "@shared/lib";
import { VeilFormComponent } from "./ui/veil-form/veil-form.component";
import { ImagePopupComponent, ListViewComponent, ListViewColumn, CardViewComponent, CardViewConfig } from "@shared/ui";
import { tap } from "rxjs";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-veil-page",
  standalone: true,
  imports: [CommonModule, CardViewComponent, VeilFormComponent, ImagePopupComponent, ListViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./veil.component.html",
  styleUrls: ["./veil.component.scss"],
  providers: [VeilService],
})
export class VeilPageComponent implements OnInit {
  private veilService = inject(VeilService);
  private adminSettingsService = inject(AdminSettingsService);
  private formData = signal(new FormData());
  env = signal(environment);

  veils = this.veilService.veils;

  // Dynamic select lists from admin settings
  veilCategories = computed(() => this.adminSettingsService.settings()?.veilSilhouettes?.length
    ? this.adminSettingsService.settings()!.veilSilhouettes
    : ['Bridal', 'Evening', 'Accessories']
  );
  veilSilhouettes = computed(() => this.adminSettingsService.settings()?.veilSilhouettes ?? []);
  veilNecklines = computed(() => this.adminSettingsService.settings()?.veilNecklines ?? []);
  veilFabrics = computed(() => this.adminSettingsService.settings()?.veilFabrics ?? []);
  veilTrainLengths = computed(() => this.adminSettingsService.settings()?.veilTrainLengths ?? []);

  // Filter buttons use silhouette list + 'All' for now — business decision could be categories
  filterList = computed(() => {
    const settings = this.adminSettingsService.settings();
    // For filtering we use a simple 'All' + silhouette categories
    return ['All', ...(settings?.veilSilhouettes ?? [])];
  });
  activeFilter = signal('All');

  // Modal States
  isVeilFormOpen = signal(false);
  editingVeil = signal<Veil | null>(null);

  // View Mode
  viewMode = signal<"grid" | "list">("grid");

  columns = signal<ListViewColumn[]>([
    { key: "image", label: "Gown", type: "custom" },
    { key: "name", label: "Name", type: "text" },
    { key: "sku", label: "SKU", type: "text" },
    { key: "price", label: "Price", type: "custom" },
    { key: "stock", label: "Stock", type: "badge" },
    { key: "category", label: "Category", type: "badge" },
    { key: "actions", label: "Actions", type: "actions" },
  ]);

  veilCardConfig: CardViewConfig = {
    imageField: 'image',
    titleField: 'name',
    subtitleField: 'sku',
    priceField: 'price',
    details: [
      { label: 'Silhouette', field: 'silhouette' },
      { label: 'Neckline', field: 'neckline' },
      { label: 'Fabric', field: 'fabric' },
      { label: 'Train Length', field: 'trainLength' },
      { label: 'Availability', field: 'stock', type: 'boolean', trueLabel: 'In Stock', falseLabel: 'Out of Stock' }
    ]
  };

  filteredVeils = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.veils();
    return this.veils().filter(v => v.silhouette === filter || v.category === filter);
  });

  // Image Preview State
  selectedImage = signal<string | null>(null);

  ngOnInit() {
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
    this.veilService.getVeils().subscribe();
  }

  // Edit Methods
  openAddModal() {
    this.editingVeil.set(null);
    this.isVeilFormOpen.set(true);
  }

  openEditModal(veil: Veil) {
    this.editingVeil.set(veil);
    this.isVeilFormOpen.set(true);
  }

  closeEditModal() {
    this.isVeilFormOpen.set(false);
    this.editingVeil.set(veilFormData);
  }

  handleSave(event: { data: Veil; file: File | null }) {
    const { data, file } = event;
    this.formDataSave(event);

    const currentVeil = this.editingVeil();
    if (currentVeil) {
      this.updateVeil(data, file);
    } else {
      this.createVeil();
    }
  }

  // Image Modal Methods
  openImageModal(imageUrl: string) {
    if (!imageUrl) return;
    const isAbsolute = imageUrl.startsWith("http") || imageUrl.startsWith("blob") || imageUrl.includes(this.env().apiUrl);
    this.selectedImage.set(isAbsolute ? imageUrl : linkServerConvert(imageUrl));
  }

  closeImageModal() {
    this.selectedImage.set(null);
  }

  onDeleteCard(id: string) {
    if (confirm("Are you sure you want to delete this gown?")) {
      this.deleteCard(id);
    }
  }

  getSafeImageUrl(path: string | undefined) {
    if (!path) return "assets/placeholder-veil.png";
    const isAbsolute = path.startsWith("http") || path.startsWith("blob") || path.includes(this.env().apiUrl);
    return isAbsolute ? path : linkServerConvert(path);
  }

  private updateFormData(data: Veil, file: File | null) {
    this.formData.set(convertFormData(data, file));
  }

  private updateVeil(data: Veil, file: File | null) {
    this.updateFormData(data, file);
    this.veilService
      .updateVeil(data.id, this.formData())
      .pipe(tap(() => this.closeEditModal()))
      .subscribe();
  }

  private createVeil() {
    this.veilService
      .createVeil(this.formData())
      .pipe(tap(() => this.closeEditModal()))
      .subscribe();
  }

  private formDataSave(event: { data: Veil; file: File | null }) {
    const { data, file } = event;
    this.formData.set(convertFormData(data, file));
  }

  private deleteCard(id: string) {
    this.veilService.deleteVeil(id).subscribe();
  }
}
