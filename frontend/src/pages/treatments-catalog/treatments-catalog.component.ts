import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminSettingsService } from "@entities/admin-settings";
import { TreatmentsService } from "@entities/treatments";
import { environment } from "@environments/environment";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-services-catalog",
  standalone: true,
  imports: [CommonModule],
  providers: [TreatmentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./treatments-catalog.component.html",
  styleUrls: ["./treatments-catalog.component.scss"],
})
export class ServicesCatalogComponent implements OnInit {
  private treatmentsService = inject(TreatmentsService);
  private adminSettingsService = inject(AdminSettingsService);
  private env = signal(environment);

  // Live data from backend GET /treatments
  treatments = this.treatmentsService.treatments;

  // Dynamic filter list from AdminSettings
  filterOptions = computed<string[]>(() => {
    const cats = this.adminSettingsService.settings()?.treatmentCategories;
    return ["All Services", ...(cats && cats.length > 0 ? cats : ["Medical Aesthetics", "Professional Visage", "Skin Therapy"])];
  });

  activeFilter = signal("All Services");

  filteredServices = computed(() => {
    const all = this.treatments();
    const filter = this.activeFilter();
    if (filter === "All Services") return all;
    return all.filter((t) => t.category === filter);
  });

  ngOnInit() {
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
    this.treatmentsService.getTreatments().subscribe();
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return "assets/placeholder-treatment.png";
    const isAbsolute =
      path.startsWith("http") ||
      path.startsWith("blob") ||
      path.includes(this.env().apiUrl);
    return isAbsolute ? path : linkServerConvert(path);
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}
