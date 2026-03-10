import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface TreatmentItem {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
  active: boolean;
}

@Component({
  selector: "app-treatments-page",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./treatments.component.html",
  styleUrls: ["./treatments.component.scss"],
})
export class ServicesPageComponent {
  treatments = signal<TreatmentItem[]>([]);

  filters = [
    $localize`:@@filterAll:All`,
    $localize`:@@filterInjectables:Injectables`,
    $localize`:@@filterFacials:Facials`,
    $localize`:@@filterLaser:Laser`,
  ];
  activeFilter = signal("All");
  viewMode = signal<"list" | "card">("list");

  filteredServices = computed(() => {
    const filter = this.activeFilter();
    const all = this.treatments();
    if (filter === "All") return all;
    return all.filter((s) => s.category === filter);
  });

  isEditModalOpen = signal(false);
  tempService: TreatmentItem = {
    id: 0,
    name: "",
    category: "Injectables",
    price: 0,
    duration: "",
    active: true,
  };

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  openAddModal() {
    this.tempService = {
      id: 0,
      name: "",
      category: "Injectables",
      price: 0,
      duration: "",
      active: true,
    };
    this.isEditModalOpen.set(true);
  }

  openEditModal(service: TreatmentItem) {
    this.tempService = { ...service };
    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
  }

  deleteService(id: number) {
    if (
      confirm(
        $localize`:@@treatmentsConfirmDelete:Are you sure you want to delete this service?`,
      )
    ) {
      this.treatments.update((items) => items.filter((item) => item.id !== id));
    }
  }

  saveEdit() {
    if (this.tempService.id === 0) {
      const newId =
        this.treatments().length > 0
          ? Math.max(...this.treatments().map((s) => s.id)) + 1
          : 1;
      const newService = { ...this.tempService, id: newId };
      this.treatments.update((items) => [...items, newService]);
    } else {
      this.treatments.update((items) =>
        items.map((item) =>
          item.id === this.tempService.id ? { ...this.tempService } : item,
        ),
      );
    }
    this.closeEditModal();
  }

  toggleTempActive() {
    this.tempService.active = !this.tempService.active;
  }
}
