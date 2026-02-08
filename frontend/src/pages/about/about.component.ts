import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  
  contactModel = signal({
    fullName: '',
    phoneNumber: '',
    serviceOfInterest: '',
    message: ''
  });

  contactForm = form(this.contactModel, (schema) => {
    required(schema.fullName);
    required(schema.phoneNumber);
    required(schema.serviceOfInterest);
  });

  onSubmit() {
    // Basic validation check
    const isNameValid = this.contactForm.fullName().valid();
    const isPhoneValid = this.contactForm.phoneNumber().valid();
    const isServiceValid = this.contactForm.serviceOfInterest().valid();

    if (isNameValid && isPhoneValid && isServiceValid) {
      console.log('Form Submitted', this.contactModel());
      // Here you would typically send the data to a service
    } else {
      console.log('Form is invalid');
    }
  }
}
