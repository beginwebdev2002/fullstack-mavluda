import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veil } from '@features/veil/model/veil.data';

@Component({
  selector: 'app-veil-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veil-item.component.html',
})
export class VeilItemComponent {
  veil = input.required<Veil>();
  edit = output<Veil>();
  viewImage = output<string>();

  safeImageUrl = computed(() => {
     return this.veil().images && this.veil().images.length > 0 ? this.veil().images[0] : 'assets/placeholder-gown.png'; 
  });

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit(this.veil());
  }

  onViewImage(event: Event) {
    event.stopPropagation();
    if (this.veil().images && this.veil().images.length > 0) {
      this.viewImage.emit(this.veil().images[0]);
    }
  }
}
