import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [CommonModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent {
  settingsForm = input.required<any>();
  save = output<void>();
}
