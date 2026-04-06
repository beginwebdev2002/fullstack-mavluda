import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { AdminSettingsService } from '@entities/admin-settings';
import { AdminSettings } from '@shared/models/admin-settings.model';
import { BusinessProfileComponent } from './ui/business-profile/business-profile.component';
import { SocialMatrixComponent, SocialPlatform } from './ui/social-matrix/social-matrix.component';
import { GeneralInfoComponent } from './ui/general-info/general-info.component';
import { AdditionalLinksComponent, AdditionalLink } from './ui/additional-links/additional-links.component';
import { SelectsSettingsComponent, SelectListType } from './ui/selects-settings/selects-settings.component';

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
    settingsModel = signal<AdminSettings>({
      id: '',
      location: { address: '', latitude: 0, longitude: 0 },
      ownerInfo: { name: '', phoneNumber: '' },
      biography: '',
      philosophy: '',
      galleryCategories: [],
      treatmentCategories: [],
      veilSilhouettes: [],
      veilFabrics: [],
      veilTrainLengths: [],
      veilNecklines: [],
      socialLinks: {},
      workHours: {}
    });

    settingsForm = form(this.settingsModel);

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
          const current = this.settingsModel();
          this.settingsModel.set({
            ...current,
            ...settings
          });
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
        location: this.settingsModel().location,
        ownerInfo: this.settingsModel().ownerInfo
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
        biography: this.settingsModel().biography,
        philosophy: this.settingsModel().philosophy
      }).subscribe();
    }

    saveSelectionLists() {
      this.adminSettingsService.updateSettings({
        galleryCategories: this.settingsModel().galleryCategories,
        treatmentCategories: this.settingsModel().treatmentCategories,
        veilSilhouettes: this.settingsModel().veilSilhouettes,
        veilFabrics: this.settingsModel().veilFabrics,
        veilTrainLengths: this.settingsModel().veilTrainLengths,
        veilNecklines: this.settingsModel().veilNecklines
      }).subscribe();
    }

    // --- CRUD for Selection Lists ---
    // (Note: To simplify the implementation, dynamic arrays are updated directly via the signal model)
    addItem(type: SelectListType) {
      const newItem = 'New Item';
      this.settingsModel.update(m => {
        const lists = {...m};
        switch(type) {
          case 'gallery': lists.galleryCategories = [...m.galleryCategories, newItem]; break;
          case 'treatment': lists.treatmentCategories = [...m.treatmentCategories, newItem]; break;
          case 'silhouette': lists.veilSilhouettes = [...m.veilSilhouettes, newItem]; break;
          case 'fabric': lists.veilFabrics = [...m.veilFabrics, newItem]; break;
          case 'train': lists.veilTrainLengths = [...m.veilTrainLengths, newItem]; break;
          case 'neckline': lists.veilNecklines = [...m.veilNecklines, newItem]; break;
        }
        return lists;
      });
    }

    updateItem(type: SelectListType, index: number, value: string) {
      this.settingsModel.update(m => {
        const lists = {...m};
        switch(type) {
          case 'gallery': lists.galleryCategories = lists.galleryCategories.map((v, i) => i === index ? value : v); break;
          case 'treatment': lists.treatmentCategories = lists.treatmentCategories.map((v, i) => i === index ? value : v); break;
          case 'silhouette': lists.veilSilhouettes = lists.veilSilhouettes.map((v, i) => i === index ? value : v); break;
          case 'fabric': lists.veilFabrics = lists.veilFabrics.map((v, i) => i === index ? value : v); break;
          case 'train': lists.veilTrainLengths = lists.veilTrainLengths.map((v, i) => i === index ? value : v); break;
          case 'neckline': lists.veilNecklines = lists.veilNecklines.map((v, i) => i === index ? value : v); break;
        }
        return lists;
      });
    }

    removeItem(type: SelectListType, index: number) {
      this.settingsModel.update(m => {
        const lists = {...m};
        switch(type) {
          case 'gallery': lists.galleryCategories = lists.galleryCategories.filter((_, i) => i !== index); break;
          case 'treatment': lists.treatmentCategories = lists.treatmentCategories.filter((_, i) => i !== index); break;
          case 'silhouette': lists.veilSilhouettes = lists.veilSilhouettes.filter((_, i) => i !== index); break;
          case 'fabric': lists.veilFabrics = lists.veilFabrics.filter((_, i) => i !== index); break;
          case 'train': lists.veilTrainLengths = lists.veilTrainLengths.filter((_, i) => i !== index); break;
          case 'neckline': lists.veilNecklines = lists.veilNecklines.filter((_, i) => i !== index); break;
        }
        return lists;
      });
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
