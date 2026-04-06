import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [CommonModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent {
  settingsForm = input.required<any>();
  save = output<void>();
}
