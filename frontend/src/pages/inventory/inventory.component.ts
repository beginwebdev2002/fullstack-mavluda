
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryPageComponent {
  inventory = signal([
    { id: 1, name: $localize`:@@invBotox:Botox Vial (100u)`, sku: 'BTX-100', quantity: 45, cost: 200, icon: '💉' },
    { id: 2, name: $localize`:@@invJuvederm:Juvederm Ultra`, sku: 'JUV-ULT', quantity: 8, cost: 180, icon: '💧' },
    { id: 3, name: $localize`:@@invNumbing:Numbing Cream 50g`, sku: 'NUM-50', quantity: 120, cost: 15, icon: '🧴' },
    { id: 4, name: $localize`:@@invGloves:Surgical Gloves (M)`, sku: 'GLV-M', quantity: 500, cost: 0.2, icon: '🧤' },
    { id: 5, name: $localize`:@@invGoldMask:Gold Mask Serum`, sku: 'GLD-SRM', quantity: 2, cost: 45, icon: '✨' },
  ]);
}
