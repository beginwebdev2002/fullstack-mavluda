import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdditionalLink {
  id: number;
  label: string;
  targetUrl: string;
  category: string;
  categoryColor: 'blue' | 'green';
}

@Component({
  selector: 'app-additional-links',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './additional-links.component.html',
  styleUrl: './additional-links.component.scss'
})
export class AdditionalLinksComponent {
  links = input.required<AdditionalLink[]>();
  
  addLink = output<void>();
  removeLink = output<number>();
  updateLink = output<AdditionalLink>();

  onUpdate(id: number, field: keyof AdditionalLink, value: any) {
    const link = this.links().find(l => l.id === id);
    if (link) {
      this.updateLink.emit({ ...link, [field]: value });
    }
  }
}
