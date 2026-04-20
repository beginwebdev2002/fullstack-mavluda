import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AdminSettingsService } from '@entities/admin-settings';
import { VeilService } from '@entities/veil';
import { environment } from '@environments/environment';
import { linkServerConvert } from '@shared/lib';
import { ImagePopupComponent } from "@shared/ui";

@Component({
  selector: 'app-veils-catalog',
  standalone: true,
  imports: [CommonModule, ImagePopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VeilService],
  templateUrl: './veils-catalog.component.html',
  styleUrls: ['./veils-catalog.component.scss']
})
export class VeilsCatalogComponent implements OnInit {
  private veilService = inject(VeilService);
  private adminSettingsService = inject(AdminSettingsService);

  private env = signal(environment);

  // Load veils from backend
  veils = this.veilService.veils;

  // Dynamic filter categories from admin settings (silhouettes as category filter)
  filters = computed<string[]>(() => {
    const settings = this.adminSettingsService.settings();
    const cats = settings?.veilSilhouettes ?? [];
    return ['All Gowns', ...cats];
  });

  activeFilter = signal('All Gowns');

  filteredGowns = computed(() => {
    const filter = this.activeFilter();
    const all = this.veils();
    if (filter === 'All Gowns') return all;
    return all.filter(v => v.category === filter || v.silhouette === filter);
  });

  // Full Screen Image Modal State
  selectedImage = signal<string | null>(null);

  ngOnInit() {
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
    this.veilService.getVeils().subscribe();
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return 'assets/placeholder-veil.png';
    const isAbsolute = path.startsWith('http') || path.startsWith('blob') || path.includes(this.env().apiUrl);
    return isAbsolute ? path : linkServerConvert(path);
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  openImageModal(imageUrl: string | undefined) {
    if (!imageUrl) return;
    this.selectedImage.set(this.getImageUrl(imageUrl));
  }

  closeImageModal() {
    this.selectedImage.set(null);
  }
}
