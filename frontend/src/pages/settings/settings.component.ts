import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSettingsService } from '@entities/admin-settings';

type SettingsTab = 'Business Profile' | 'Social Matrix' | 'General Info' | 'Additional Links' | 'SELECTS';

interface SocialPlatform {
  id: number;
  name: string;
  url: string;
  iconUrl: string;
  alt: string;
}

interface AdditionalLink {
  id: number;
  label: string;
  targetUrl: string;
  category: string;
  categoryColor: 'blue' | 'green';
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    private adminSettingsService = inject(AdminSettingsService);

    tabs: SettingsTab[] = ['Business Profile', 'Social Matrix', 'General Info', 'Additional Links', 'SELECTS'];
    activeTab = signal<SettingsTab>('Business Profile');

    // Selection Lists (Signals)
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

    ngOnInit() {
      this.adminSettingsService.getSettings().subscribe(settings => {
        if (settings) {
          this.galleryCategories.set(settings.galleryCategories || []);
          this.treatmentCategories.set(settings.treatmentCategories || []);
          this.veilSilhouettes.set(settings.veilSilhouettes || []);
          this.veilFabrics.set(settings.veilFabrics || []);
          this.veilTrainLengths.set(settings.veilTrainLengths || []);
          this.veilNecklines.set(settings.veilNecklines || []);
        }
      });
    }

    // --- CRUD for Selection Lists ---

    addItem(list: 'gallery' | 'treatment' | 'silhouette' | 'fabric' | 'train' | 'neckline') {
      const newItem = 'New Item';
      switch(list) {
        case 'gallery': this.galleryCategories.update(items => [...items, newItem]); break;
        case 'treatment': this.treatmentCategories.update(items => [...items, newItem]); break;
        case 'silhouette': this.veilSilhouettes.update(items => [...items, newItem]); break;
        case 'fabric': this.veilFabrics.update(items => [...items, newItem]); break;
        case 'train': this.veilTrainLengths.update(items => [...items, newItem]); break;
        case 'neckline': this.veilNecklines.update(items => [...items, newItem]); break;
      }
    }

    updateItem(list: 'gallery' | 'treatment' | 'silhouette' | 'fabric' | 'train' | 'neckline', index: number, value: string) {
      switch(list) {
        case 'gallery': this.galleryCategories.update(items => { items[index] = value; return [...items]; }); break;
        case 'treatment': this.treatmentCategories.update(items => { items[index] = value; return [...items]; }); break;
        case 'silhouette': this.veilSilhouettes.update(items => { items[index] = value; return [...items]; }); break;
        case 'fabric': this.veilFabrics.update(items => { items[index] = value; return [...items]; }); break;
        case 'train': this.veilTrainLengths.update(items => { items[index] = value; return [...items]; }); break;
        case 'neckline': this.veilNecklines.update(items => { items[index] = value; return [...items]; }); break;
      }
    }

    removeItem(list: 'gallery' | 'treatment' | 'silhouette' | 'fabric' | 'train' | 'neckline', index: number) {
      switch(list) {
        case 'gallery': this.galleryCategories.update(items => items.filter((_, i) => i !== index)); break;
        case 'treatment': this.treatmentCategories.update(items => items.filter((_, i) => i !== index)); break;
        case 'silhouette': this.veilSilhouettes.update(items => items.filter((_, i) => i !== index)); break;
        case 'fabric': this.veilFabrics.update(items => items.filter((_, i) => i !== index)); break;
        case 'train': this.veilTrainLengths.update(items => items.filter((_, i) => i !== index)); break;
        case 'neckline': this.veilNecklines.update(items => items.filter((_, i) => i !== index)); break;
      }
    }

    saveSelectionLists() {
      const settings = this.adminSettingsService.settings();
      if (settings) {
        this.adminSettingsService.updateSettings({
          galleryCategories: this.galleryCategories(),
          treatmentCategories: this.treatmentCategories(),
          veilSilhouettes: this.veilSilhouettes(),
          veilFabrics: this.veilFabrics(),
          veilTrainLengths: this.veilTrainLengths(),
          veilNecklines: this.veilNecklines()
        }).subscribe();
      }
    }

    // --- Existing Methods ---

    addSocialPlatform() {
      const newPlatform: SocialPlatform = {
        id: Date.now(),
        name: 'New Platform',
        url: 'https://',
        iconUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAh_4_s1A2wU4k2pXsv2gAFpqfGSL2P9yA6_LC9Sl_3_k39n-u-f_WjI-QO2J_o73A1I5k8gGf6f_h_Y2P-N3g-T_w_o-g_k-Z_4_w_o-g_k-Z_4_w_o-g_k-Z_4_w_o-g_k-Z_4_w_o-g_k-Z_4_w_o-g_k-Z_4_w_o-g_k-Z_4', // Placeholder icon
        alt: 'New'
      };
      this.socialPlatforms.update(platforms => [...platforms, newPlatform]);
    }

    removeSocialPlatform(id: number) {
      this.socialPlatforms.update(platforms => platforms.filter(p => p.id !== id));
    }

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
}
