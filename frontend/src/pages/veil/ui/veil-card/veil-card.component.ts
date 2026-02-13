import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Veil } from '@features/veil/model/veil.data';

@Component({
  selector: 'app-veil-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './veil-card.component.html',
  styleUrl: './veil-card.component.scss'
})
export class VeilCardComponent {
  veil = input.required<Veil>();
  index = input<number>(0);
  edit = output<Veil>();
  viewImage = output<string>();

  safeImageUrl(): string {
     return this.veil().images && this.veil().images.length > 0 ? this.veil().images[0] : 'assets/placeholder-gown.png'; 
  }

  onEdit() {
    this.edit.emit(this.veil());
  }

  onViewImage() {
    this.viewImage.emit(this.safeImageUrl());
  }
}
