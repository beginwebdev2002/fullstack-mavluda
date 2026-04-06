import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SocialPlatform {
  id: number;
  name: string;
  url: string;
  iconUrl: string;
  alt: string;
}

@Component({
  selector: 'app-social-matrix',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './social-matrix.component.html',
  styleUrl: './social-matrix.component.scss'
})
export class SocialMatrixComponent {
  platforms = input.required<SocialPlatform[]>();
  
  addPlatform = output<void>();
  removePlatform = output<number>();
  updatePlatform = output<SocialPlatform>();
  save = output<void>();

  onUpdate(id: number, field: keyof SocialPlatform, value: any) {
    const platform = this.platforms().find(p => p.id === id);
    if (platform) {
      this.updatePlatform.emit({ ...platform, [field]: value });
    }
  }
}
