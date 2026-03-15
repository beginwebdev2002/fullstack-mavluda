import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { VeilService } from "@entities/veil";
import { Veil, veilFormData } from "@features/veil";
import { convertFormData } from "@shared/lib";
import { VeilCardComponent } from "./ui/veil-card/veil-card.component";
import { VeilFormComponent } from "./ui/veil-form/veil-form.component";
import { tap } from "rxjs";

@Component({
  selector: "app-veil-page",
  standalone: true,
  imports: [CommonModule, VeilCardComponent, VeilFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./veil.component.html",
  styleUrls: ["./veil.component.scss"],
  providers: [VeilService],
})
export class VeilPageComponent implements OnInit {
  private veilService = inject(VeilService);
  private formData = signal(new FormData());

  veils = this.veilService.veils;

  // Modal States
  isVeilFormOpen = signal(false);
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

  onDeleteCard(id: string) {
    this.deleteCard(id);
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
