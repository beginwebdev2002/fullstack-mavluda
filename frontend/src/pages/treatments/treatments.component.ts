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
import { TreatmentFormComponent } from "./components/treatment-form/treatment-form.component";
import { TreatmentItem } from "@features/treatments";
import { TreatmentsService } from "@entities/treatments";
import { AdminSettingsService } from "@entities/admin-settings";
import { ListViewComponent, ListViewColumn, CardViewComponent, CardViewConfig, ImagePopupComponent } from "@shared/ui";
import { environment } from "@environments/environment";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-treatments-page",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TreatmentFormComponent,
    CardViewComponent,
    ListViewComponent,
    ImagePopupComponent,
  ],
  providers: [TreatmentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./treatments.component.html",
  styleUrls: ["./treatments.component.scss"],
})
export class TreatmentsPageComponent implements OnInit {
  private treatmentsService = inject(TreatmentsService);
  private adminSettingsService = inject(AdminSettingsService);
  env = signal(environment);

  treatments = this.treatmentsService.treatments;

  // Dynamic treatment categories from admin settings
  treatmentCategories = computed<string[]>(() => {
    const cats = this.adminSettingsService.settings()?.treatmentCategories;
    return cats && cats.length > 0 ? cats : ['Injectables', 'Facials', 'Laser'];
  });

  // Filters = 'All' + dynamic categories
  filters = computed<string[]>(() => ['All', ...this.treatmentCategories()]);

  activeFilter = signal("All");
  viewMode = signal<"list" | "card">("list");

  columns = signal<ListViewColumn[]>([
    { key: 'name', label: 'Service Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'badge' },
    { key: 'duration', label: 'Duration', type: 'text' },
    { key: 'price', label: 'Price', type: 'custom' },
    { key: 'active', label: 'Status', type: 'status' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ]);

  treatmentCardConfig: CardViewConfig = {
    imageField: 'imageUrl',
    titleField: 'name',
    subtitleField: 'category',
    priceField: 'price',
    details: [
      { label: 'Duration', field: 'duration' },
      { label: 'Status', field: 'active', type: 'status' }
    ]
  };

  filteredTreatments = computed(() => {
    const filter = this.activeFilter();
    const all = this.treatments();
    if (filter === "All") return all;
    return all.filter((s) => s.category === filter);
  });

  isEditModalOpen = signal(false);
  tempTreatment: TreatmentItem = {
    id: 0,
    name: "",
    category: "Injectables",
    price: 0,
    duration: 0,
    active: true,
    description: "",
  };

  // Image Preview State
  selectedImage = signal<string | null>(null);

  ngOnInit() {
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
    this.treatmentsService.getTreatments().subscribe();
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  openAddModal() {
    const defaultCat = this.treatmentCategories()[0] ?? 'Injectables';
    this.tempTreatment = {
      id: "",
      name: "",
      category: defaultCat,
      price: 0,
      duration: 0,
      active: true,
      description: "",
    };
    this.isEditModalOpen.set(true);
  }

  openEditModal(treatment: TreatmentItem) {
    this.tempTreatment = { ...treatment };
    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
  }

  deleteTreatment(id: string | number) {
    if (
      confirm(
        $localize`:@@treatmentsConfirmDelete:Are you sure you want to delete this service?`,
      )
    ) {
      this.treatmentsService.deleteTreatment(id as string).subscribe();
    }
  }

  onSaveTreatment(formData: FormData) {
    const id = formData.get("id") as string | null;

    if (!id || id === "0" || id === "") {
      this.treatmentsService.createTreatment(formData).subscribe(() => {
        this.closeEditModal();
      });
    } else {
      this.treatmentsService.updateTreatment(id, formData).subscribe(() => {
        this.closeEditModal();
      });
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
}
