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
import { TreatmentCardComponent } from "./components/treatment-card/treatment-card.component";
import { TreatmentItem } from "@features/treatments";
import { TreatmentsService } from "@entities/treatments";
import { ListViewComponent, ListViewColumn } from "@shared/ui";

@Component({
  selector: "app-treatments-page",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TreatmentFormComponent,
    TreatmentCardComponent,
    ListViewComponent,
  ],
  providers: [TreatmentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./treatments.component.html",
  styleUrls: ["./treatments.component.scss"],
})
export class TreatmentsPageComponent implements OnInit {
  private treatmentsService = inject(TreatmentsService);

  treatments = this.treatmentsService.treatments;

  filters = [
    $localize`:@@filterAll:All`,
    $localize`:@@filterInjectables:Injectables`,
    $localize`:@@filterFacials:Facials`,
    $localize`:@@filterLaser:Laser`,
  ];
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

  ngOnInit() {
    this.treatmentsService.getTreatments().subscribe();
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  openAddModal() {
    this.tempTreatment = {
      id: "",
      name: "",
      category: "Injectables",
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
}
