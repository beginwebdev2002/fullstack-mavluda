import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { AdminSettingsService } from '@entities/admin-settings';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private adminSettingsService = inject(AdminSettingsService);
  private sanitizer = inject(DomSanitizer);

  // Computed values from admin settings
  settings = this.adminSettingsService.settings;

  address = computed(() => this.settings()?.location?.address || 'Rudaki Avenue 127, Suite 402, Dushanbe');
  phone = computed(() => this.settings()?.ownerInfo?.phoneNumber || '+992 (90) 000-0000');
  biography = computed(() => this.settings()?.biography || null);
  philosophy = computed(() => this.settings()?.philosophy || null);

  // Social links as array of { key, url } for convenient template iteration
  socialLinks = computed(() => {
    const links = this.settings()?.socialLinks ?? {};
    return Object.entries(links).map(([key, url]) => ({ key, url }));
  });

  // Map embed URL computed from lat/lng if available
  mapUrl = computed<SafeResourceUrl>(() => {
    const loc = this.settings()?.location;
    const raw = (loc?.latitude && loc?.longitude)
      ? `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&output=embed`
      : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97236.72195867906!2d68.70670878583486!3d38.56156386866579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b5d16c7476569b%3A0x8849646b5a34241!2sDushanbe%2C%20Tajikistan!5e0!3m2!1sen!2sus!4v1647853162725!5m2!1sen!2sus';
    return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
  });

  // Contact form
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

  isSubmitting = signal(false);
  submitSuccess = signal(false);

  // Treatment categories for the service select dropdown
  treatmentCategories = computed(() =>
    this.settings()?.treatmentCategories ?? ['Medical Facial', 'Laser Treatment', 'Injectables', 'Visagiste']
  );

  ngOnInit() {
    if (!this.adminSettingsService.settings()) {
      this.adminSettingsService.getSettings().subscribe();
    }
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    submit(this.contactForm, async () => {
      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        
        // Reset form
        this.contactForm().reset();
        this.contactModel.set({
          fullName: '',
          phoneNumber: '',
          serviceOfInterest: '',
          message: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => this.submitSuccess.set(false), 5000);
      }, 1500);
    });
  }

  // Helper to get social icon name from key
  getSocialIcon(key: string): string {
    const icons: Record<string, string> = {
      whatsapp: 'chat',
      telegram: 'send',
      instagram: 'photo_camera',
      facebook: 'thumb_up',
      tiktok: 'music_video',
      youtube: 'play_circle',
    };
    return icons[key.toLowerCase()] ?? 'link';
  }
}
