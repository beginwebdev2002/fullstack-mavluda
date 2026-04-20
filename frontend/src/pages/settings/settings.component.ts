import { Component, ChangeDetectionStrategy, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, Subject, startWith, catchError, of } from 'rxjs';
import { AdminSettingsService } from '@entities/admin-settings';
import { AdminLocation, AdminSettings, OwnerInfo } from '@shared/models/admin-settings.model';
import { BusinessProfileComponent } from './ui/business-profile.component';
import { SocialMatrixComponent, SocialPlatform } from './ui/social-matrix.component';
import { GeneralInfoComponent } from './ui/general-info.component';
import { AdditionalLinksComponent, AdditionalLink } from './ui/additional-links.component';
import { SelectsSettingsComponent, SelectListType } from './ui/selects-settings.component';

type SettingsTab = 'Business Profile' | 'Social Matrix' | 'General Info' | 'Additional Links' | 'SELECTS';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BusinessProfileComponent,
    SocialMatrixComponent,
    GeneralInfoComponent,
    AdditionalLinksComponent,
    SelectsSettingsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private adminSettingsService = inject(AdminSettingsService);

  tabs: SettingsTab[] = ['Business Profile', 'Social Matrix', 'General Info', 'Additional Links', 'SELECTS'];
  activeTab = signal<SettingsTab>('Business Profile');

  // Reload trigger
  private reload$ = new Subject<void>();

  // Load settings from backend as a signal
  private loadedSettings = toSignal(
    this.reload$.pipe(
      startWith(undefined),
      switchMap(() => this.adminSettingsService.getSettings().pipe(catchError(() => of(null))))
    ),
    { initialValue: null }
  );

  // Save UI state
  isSaving = signal(false);
  saveSuccess = signal(false);
  saveError = signal<string | null>(null);

  // Admin Settings State — derived from loaded, then locally mutable
  location = signal<AdminLocation>({ address: '', latitude: 0, longitude: 0 });
  ownerInfo = signal<OwnerInfo>({ name: '', phoneNumber: '' });
  biography = signal<string>('');
  philosophy = signal<string>('');

  galleryCategories = signal<string[]>([]);
  treatmentCategories = signal<string[]>([]);
  veilSilhouettes = signal<string[]>([]);
  veilFabrics = signal<string[]>([]);
  veilTrainLengths = signal<string[]>([]);
  veilNecklines = signal<string[]>([]);

  socialPlatforms = signal<SocialPlatform[]>([
    { id: 1, name: 'Instagram', url: 'https://instagram.com/mavluda_azizova', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', alt: 'Instagram' },
    { id: 2, name: 'Telegram', url: 'https://t.me/mavluda_beauty', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg', alt: 'Telegram' },
    { id: 3, name: 'WhatsApp', url: 'https://wa.me/998901234567', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', alt: 'WhatsApp' },
  ]);

  additionalLinks = signal<AdditionalLink[]>([
    { id: 1, label: 'Press Release 2024', targetUrl: 'https://example.com/press/mavluda-2024', category: 'Press', categoryColor: 'blue' },
    { id: 2, label: 'Medical Certification', targetUrl: 'https://docs.mavluda.uz/certs/iso-9001', category: 'Compliance', categoryColor: 'green' },
  ]);

  constructor() {
    // Reactively sync loaded settings into local writable signals
    effect(() => {
      const settings = this.loadedSettings();
      if (!settings) return;

      this.location.set(settings.location || { address: '', latitude: 0, longitude: 0 });
      this.ownerInfo.set(settings.ownerInfo || { name: '', phoneNumber: '' });
      this.biography.set(settings.biography || '');
      this.philosophy.set(settings.philosophy || '');
      this.galleryCategories.set(settings.galleryCategories || []);
      this.treatmentCategories.set(settings.treatmentCategories || []);
      this.veilSilhouettes.set(settings.veilSilhouettes || []);
      this.veilFabrics.set(settings.veilFabrics || []);
      this.veilTrainLengths.set(settings.veilTrainLengths || []);
      this.veilNecklines.set(settings.veilNecklines || []);

      if (settings.socialLinks && Object.keys(settings.socialLinks).length > 0) {
        const platforms = Object.entries(settings.socialLinks).map(([name, url], i) => ({
          id: Date.now() + i,
          name,
          url,
          iconUrl: '',
          alt: name
        }));
        this.socialPlatforms.set(platforms);
      }
    });
  }

  // --- Save helpers ---

  private doSave(payload: Partial<AdminSettings>) {
    this.isSaving.set(true);
    this.saveSuccess.set(false);
    this.saveError.set(null);

    this.adminSettingsService.updateSettings(payload).subscribe({
      next: (updated) => {
        this.isSaving.set(false);
        this.saveSuccess.set(true);
        // Auto-hide success after 3s
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.saveError.set(err?.message || 'Save failed');
        setTimeout(() => this.saveError.set(null), 5000);
      }
    });
  }

  // --- Tab-specific Save methods ---

  saveBusinessProfile() {
    this.doSave({ location: this.location(), ownerInfo: this.ownerInfo() });
  }

  saveSocialMatrix() {
    const socialLinks: Record<string, string> = {};
    this.socialPlatforms().forEach(p => {
      if (p.name && p.url) socialLinks[p.name] = p.url;
    });
    this.doSave({ socialLinks });
  }

  saveGeneralInfo() {
    this.doSave({ biography: this.biography(), philosophy: this.philosophy() });
  }

  saveSelectionLists() {
    this.doSave({
      galleryCategories: this.galleryCategories(),
      treatmentCategories: this.treatmentCategories(),
      veilSilhouettes: this.veilSilhouettes(),
      veilFabrics: this.veilFabrics(),
      veilTrainLengths: this.veilTrainLengths(),
      veilNecklines: this.veilNecklines()
    });
  }

  // --- CRUD for Selection Lists ---

  addItem(type: SelectListType) {
    switch(type) {
      case 'gallery': this.galleryCategories.update(items => [...items, '']); break;
      case 'treatment': this.treatmentCategories.update(items => [...items, '']); break;
      case 'silhouette': this.veilSilhouettes.update(items => [...items, '']); break;
      case 'fabric': this.veilFabrics.update(items => [...items, '']); break;
      case 'train': this.veilTrainLengths.update(items => [...items, '']); break;
      case 'neckline': this.veilNecklines.update(items => [...items, '']); break;
    }
  }

  updateItem(type: SelectListType, index: number, value: string) {
    switch(type) {
      case 'gallery': this.galleryCategories.update(items => { const a = [...items]; a[index] = value; return a; }); break;
      case 'treatment': this.treatmentCategories.update(items => { const a = [...items]; a[index] = value; return a; }); break;
      case 'silhouette': this.veilSilhouettes.update(items => { const a = [...items]; a[index] = value; return a; }); break;
      case 'fabric': this.veilFabrics.update(items => { const a = [...items]; a[index] = value; return a; }); break;
      case 'train': this.veilTrainLengths.update(items => { const a = [...items]; a[index] = value; return a; }); break;
      case 'neckline': this.veilNecklines.update(items => { const a = [...items]; a[index] = value; return a; }); break;
    }
  }

  removeItem(type: SelectListType, index: number) {
    switch(type) {
      case 'gallery': this.galleryCategories.update(items => items.filter((_, i) => i !== index)); break;
      case 'treatment': this.treatmentCategories.update(items => items.filter((_, i) => i !== index)); break;
      case 'silhouette': this.veilSilhouettes.update(items => items.filter((_, i) => i !== index)); break;
      case 'fabric': this.veilFabrics.update(items => items.filter((_, i) => i !== index)); break;
      case 'train': this.veilTrainLengths.update(items => items.filter((_, i) => i !== index)); break;
      case 'neckline': this.veilNecklines.update(items => items.filter((_, i) => i !== index)); break;
    }
  }

  // --- Social Platform methods ---

  addSocialPlatform() {
    this.socialPlatforms.update(platforms => [...platforms, {
      id: Date.now(),
      name: 'New Platform',
      url: 'https://',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
      alt: 'New'
    }]);
  }

  removeSocialPlatform(id: number) {
    this.socialPlatforms.update(platforms => platforms.filter(p => p.id !== id));
  }

  updateSocialPlatform(platform: SocialPlatform) {
    this.socialPlatforms.update(platforms => platforms.map(p => p.id === platform.id ? platform : p));
  }

  // --- Additional Links methods ---

  addLink() {
    this.additionalLinks.update(links => [...links, {
      id: Date.now(),
      label: 'New Link',
      targetUrl: 'https://',
      category: 'General',
      categoryColor: 'blue'
    }]);
  }

  removeLink(id: number) {
    this.additionalLinks.update(links => links.filter(l => l.id !== id));
  }

  updateLink(link: AdditionalLink) {
    this.additionalLinks.update(links => links.map(l => l.id === link.id ? link : l));
  }
}
