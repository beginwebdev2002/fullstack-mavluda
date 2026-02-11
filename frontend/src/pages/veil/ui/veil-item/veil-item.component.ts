import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veil } from '../../veil.interface';

@Component({
  selector: 'app-veil-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veil-item.component.html',
})
export class VeilItemComponent {
  @Input({ required: true }) veil!: Veil;
  @Output() edit = new EventEmitter<Veil>();
  @Output() viewImage = new EventEmitter<string>();

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit(this.veil);
  }

  onViewImage(event: Event) {
    event.stopPropagation();
    if (this.veil.images && this.veil.images.length > 0) {
      this.viewImage.emit(this.veil.images[0]);
    }
  }
}
