import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type SelectListType = 'gallery' | 'treatment' | 'silhouette' | 'fabric' | 'train' | 'neckline';

@Component({
  selector: 'app-selects-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selects-settings.component.html',
  styleUrl: './selects-settings.component.scss'
})
export class SelectsSettingsComponent {
  galleryCategories = input.required<string[]>();
  treatmentCategories = input.required<string[]>();
  veilSilhouettes = input.required<string[]>();
  veilFabrics = input.required<string[]>();
  veilTrainLengths = input.required<string[]>();
  veilNecklines = input.required<string[]>();
  
  addItem = output<SelectListType>();
  removeItem = output<{type: SelectListType, index: number}>();
  updateItem = output<{type: SelectListType, index: number, value: string}>();
  save = output<void>();

  onUpdate(type: SelectListType, index: number, value: string) {
    this.updateItem.emit({ type, index, value });
  }
}
