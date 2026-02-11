import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Veil } from '../../../entities/veil/veil.model';

@Component({
  selector: 'app-veil-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 group relative reveal-item" [style.animation-delay.ms]="index * 100">
      
      <!-- Top Section: Image & Price -->
      <div class="flex justify-between items-start mb-6 relative">
        <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer" (click)="onViewImage()">
          <img [src]="safeImageUrl" [alt]="veil.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
        <span class="font-serif text-xl font-bold text-gray-900">{{ veil.price }} TJS</span>
        <!-- Decorative Blur Effect -->
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <!-- Title & SKU -->
      <div class="mb-6">
        <h3 class="text-2xl font-serif text-gray-900 mb-1">{{ veil.name }}</h3>
        <p class="text-xs tracking-wider text-gray-500 uppercase font-medium">{{ veil.sku }}</p>
      </div>

      <!-- Attributes Box -->
      <div class="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
        <div class="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
          <span class="text-gray-500">Silhouette</span>
          <span class="font-semibold font-serif text-gray-900">{{ veil.silhouette }}</span>
        </div>
        <div class="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
          <span class="text-gray-500">Neckline</span>
          <span class="font-semibold font-serif text-gray-900">{{ veil.neckline }}</span>
        </div>
        <div class="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
          <span class="text-gray-500">Fabric</span>
          <span class="font-semibold font-serif text-gray-900">{{ veil.fabric }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">Train Length</span>
          <span class="font-semibold font-serif text-gray-900">{{ veil.trainLength }}</span>
        </div>
      </div>

      <!-- Footer: Status & Action -->
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full" [class]="veil.stock > 0 ? 'bg-green-500 ' + (veil.stock > 1 ? 'animate-pulse' : '') : 'bg-yellow-500'"></span>
          <span class="text-sm font-medium text-gray-900">
            <ng-container *ngIf="veil.stock > 0; else outStock">
              <ng-container i18n="@@veilAvailable">{{ veil.stock }} Available</ng-container>
            </ng-container>
            <ng-template #outStock>
              <ng-container i18n="@@veilOutOfStock">Out of Stock</ng-container>
            </ng-template>
          </span>
        </div>
        <button (click)="onEdit()" class="flex items-center gap-1 text-primary hover:text-primary-hover transition-colors text-sm font-medium group-hover:translate-x-1 transition-transform">
          <span class="material-symbols-outlined text-base">edit</span>
          <span i18n="@@veilAdminEdit">Edit</span>
        </button>
      </div>

    </div>
  `
})
export class VeilCardComponent {
  @Input({ required: true }) veil!: Veil;
  @Input() index: number = 0;
  @Output() edit = new EventEmitter<Veil>();
  @Output() viewImage = new EventEmitter<string>();

  get safeImageUrl(): string {
     return this.veil.images && this.veil.images.length > 0 ? this.veil.images[0] : 'assets/placeholder-gown.png'; 
  }

  onEdit() {
    this.edit.emit(this.veil);
  }

  onViewImage() {
    this.viewImage.emit(this.safeImageUrl);
  }
}
