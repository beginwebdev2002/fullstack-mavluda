import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSettingsService } from '@entities/admin-settings';
import { AdminLocation, OwnerInfo } from '@shared/models/admin-settings.model';
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
export class SettingsComponent implements OnInit {
    private adminSettingsService = inject(AdminSettingsService);

    tabs: SettingsTab[] = ['Business Profile', 'Social Matrix', 'General Info', 'Additional Links', 'SELECTS'];
    activeTab = signal<SettingsTab>('Business Profile');

    // Admin Settings State (Signals)
    location = signal<AdminLocation>({ address: '', latitude: 0, longitude: 0 });
    ownerInfo = signal<OwnerInfo>({ name: '', phoneNumber: '' });
    biography = signal<string>('');
    philosophy = signal<string>('');

    // Selection Lists (Signals)
    galleryCategories = signal<string[]>([]);
    treatmentCategories = signal<string[]>([]);
    veilSilhouettes = signal<string[]>([]);
    veilFabrics = signal<string[]>([]);
    veilTrainLengths = signal<string[]>([]);
    veilNecklines = signal<string[]>([]);

    // UI-only for now or needs conversion
    socialPlatforms = signal<SocialPlatform[]>([
      { id: 1, name: 'Instagram', url: 'https://instagram.com/mavluda_azizova', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', alt: 'Instagram' },
      { id: 2, name: 'Telegram', url: 'https://t.me/mavluda_beauty', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg', alt: 'Telegram' },
      { id: 3, name: 'WhatsApp', url: 'https://wa.me/998901234567', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', alt: 'WhatsApp' },
    ]);

    additionalLinks = signal<AdditionalLink[]>([
      { id: 1, label: 'Press Release 2024', targetUrl: 'https://example.com/press/mavluda-2024', category: 'Press', categoryColor: 'blue' },
      { id: 2, label: 'Medical Certification', targetUrl: 'https://docs.mavluda.uz/certs/iso-9001', category: 'Compliance', categoryColor: 'green' },
    ]);

    ngOnInit() {
      this.adminSettingsService.getSettings().subscribe(settings => {
        if (settings) {
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
              iconUrl: '', // Default icon logic can be added later
              alt: name
            }));
            this.socialPlatforms.set(platforms);
          }
        }
      });
    }

    // --- Tab-specific Save methods ---
    
    saveBusinessProfile() {
      this.adminSettingsService.updateSettings({
        location: this.location(),
        ownerInfo: this.ownerInfo()
      }).subscribe();
    }

    saveSocialMatrix() {
      const socialLinks: Record<string, string> = {};
      this.socialPlatforms().forEach(p => {
        if (p.name && p.url) {
          socialLinks[p.name] = p.url;
        }
      });
      this.adminSettingsService.updateSettings({ socialLinks }).subscribe();
    }

    saveGeneralInfo() {
      this.adminSettingsService.updateSettings({
        biography: this.biography(),
        philosophy: this.philosophy()
      }).subscribe();
    }

    saveSelectionLists() {
      this.adminSettingsService.updateSettings({
        galleryCategories: this.galleryCategories(),
        treatmentCategories: this.treatmentCategories(),
        veilSilhouettes: this.veilSilhouettes(),
        veilFabrics: this.veilFabrics(),
        veilTrainLengths: this.veilTrainLengths(),
        veilNecklines: this.veilNecklines()
      }).subscribe();
    }

    // --- CRUD for Selection Lists ---

    addItem(type: SelectListType) {
      const newItem = '';
      switch(type) {
        case 'gallery': this.galleryCategories.update(items => [...items, newItem]); break;
        case 'treatment': this.treatmentCategories.update(items => [...items, newItem]); break;
        case 'silhouette': this.veilSilhouettes.update(items => [...items, newItem]); break;
        case 'fabric': this.veilFabrics.update(items => [...items, newItem]); break;
        case 'train': this.veilTrainLengths.update(items => [...items, newItem]); break;
        case 'neckline': this.veilNecklines.update(items => [...items, newItem]); break;
      }
    }

    updateItem(type: SelectListType, index: number, value: string) {
      switch(type) {
        case 'gallery': this.galleryCategories.update(items => { items[index] = value; return [...items]; }); break;
        case 'treatment': this.treatmentCategories.update(items => { items[index] = value; return [...items]; }); break;
        case 'silhouette': this.veilSilhouettes.update(items => { items[index] = value; return [...items]; }); break;
        case 'fabric': this.veilFabrics.update(items => { items[index] = value; return [...items]; }); break;
        case 'train': this.veilTrainLengths.update(items => { items[index] = value; return [...items]; }); break;
        case 'neckline': this.veilNecklines.update(items => { items[index] = value; return [...items]; }); break;
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
      const newPlatform: SocialPlatform = {
        id: Date.now(),
        name: 'New Platform',
        url: 'https://',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', // Default icon
        alt: 'New'
      };
      this.socialPlatforms.update(platforms => [...platforms, newPlatform]);
    }

    removeSocialPlatform(id: number) {
      this.socialPlatforms.update(platforms => platforms.filter(p => p.id !== id));
    }

    updateSocialPlatform(platform: SocialPlatform) {
      this.socialPlatforms.update(platforms => platforms.map(p => p.id === platform.id ? platform : p));
    }

    // --- Additional Links methods ---

    addLink() {
      const newLink: AdditionalLink = {
        id: Date.now(),
        label: 'New Link',
        targetUrl: 'https://',
        category: 'General',
        categoryColor: 'blue'
      };
      this.additionalLinks.update(links => [...links, newLink]);
    }

    removeLink(id: number) {
      this.additionalLinks.update(links => links.filter(l => l.id !== id));
    }

    updateLink(link: AdditionalLink) {
      this.additionalLinks.update(links => links.map(l => l.id === link.id ? link : l));
    }
}
