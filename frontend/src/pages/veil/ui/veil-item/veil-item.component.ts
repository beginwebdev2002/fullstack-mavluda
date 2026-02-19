import { Component, input, output, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Veil } from "@features/veil";

@Component({
  selector: "app-veil-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./veil-item.component.html",
})
export class VeilItemComponent {
  veil = input.required<Veil>();
  edit = output<Veil>();
  viewImage = output<string>();

  safeImageUrl = computed(() => {
    return this.veil().image
      ? this.veil().image
      : "assets/placeholder-gown.png";
  });

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit(this.veil());
  }

  onViewImage(event: Event) {
    event.stopPropagation();
    if (this.veil().image) {
      this.viewImage.emit(this.veil().image);
    }
  }
}
