import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { Veil, veilFormData } from "@features/veil";
import { VeilService } from "@entities/veil";
import { VeilCardComponent, VeilFormComponent } from "@pages/veil";

@Component({
  selector: "app-veil-page",
  standalone: true,
  imports: [CommonModule, VeilCardComponent, VeilFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./veil.component.html",
  styleUrls: ["./veil.component.scss"],
})
export class VeilPageComponent implements OnInit {
  private veilService = inject(VeilService);

  veils = this.veilService.veils;

  // Modal States
  isEditModalOpen = signal(false);
  editingVeil = signal<Veil | null>(null);

  // Image Preview State
  selectedImage = signal<string | null>(null);
  isImageLoading = signal(false);

  ngOnInit() {
    this.veilService.getVeils().subscribe();
  }

  // Edit Methods
  openAddModal() {
    this.editingVeil.set(null);
    this.isEditModalOpen.set(true);
  }

  openEditModal(veil: Veil) {
    this.editingVeil.set(veil);
    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.editingVeil.set(veilFormData);
  }

  handleSave(event: { data: any; file: File | null }) {
    const { data, file } = event;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (file) {
      formData.append("files", file);
    }

    const currentVeil = this.editingVeil();
    if (currentVeil) {
      if (currentVeil.images) {
        currentVeil.images.forEach((img) => formData.append("images", img));
      }

      this.veilService.updateVeil(currentVeil.id, formData).subscribe(() => {
        this.closeEditModal();
      });
    } else {
      this.veilService.createVeil(formData).subscribe(() => {
        this.closeEditModal();
      });
    }
  }

  // Image Modal Methods
  openImageModal(imageUrl: string) {
    if (!imageUrl) return;
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
}
