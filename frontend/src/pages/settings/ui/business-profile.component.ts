import { Component, ChangeDetectionStrategy, input, output, effect, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLocation, OwnerInfo } from '@shared/models';
import * as L from 'leaflet';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden animate-page-enter">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-primary mr-3">business_center</span>
          <h4 class="font-serif text-xl font-semibold text-gray-900" i18n="@@settingsSectionProfile">Business Profile</h4>
        </div>
        <button (click)="save.emit()" class="flex items-center px-4 py-2 bg-primary hover:bg-primary-hover text-black rounded-lg text-sm font-medium transition-all shadow-md btn-primary-shimmer active:scale-[0.98]" i18n="@@settingsBtnSave">
          Save Changes
        </button>
      </div>
      <div class="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider" i18n="@@settingsLabelPhone">Phone Number</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">call</span>
              <input 
                class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-gray-900" 
                type="text" 
                [ngModel]="ownerInfo().phoneNumber"
                (ngModelChange)="onOwnerInfoChange('phoneNumber', $event)"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider" i18n="@@settingsLabelAddress">Official Address</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">location_on</span>
              <input 
                class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-gray-900" 
                type="text" 
                [ngModel]="location().address"
                (ngModelChange)="onLocationChange('address', $event)"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider text-xs" i18n="@@settingsLabelLat">Latitude</label>
              <input 
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono text-gray-900" 
                type="number" 
                [ngModel]="location().latitude"
                (ngModelChange)="onLocationChange('latitude', $event)"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider text-xs" i18n="@@settingsLabelLong">Longitude</label>
              <input 
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono text-gray-900" 
                type="number" 
                [ngModel]="location().longitude"
                (ngModelChange)="onLocationChange('longitude', $event)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-end mb-2">
            <label class="block text-sm font-semibold text-gray-700 uppercase tracking-wider" i18n="@@settingsLabelMap">Interactive Map</label>
            <button (click)="getCurrentLocation()" class="text-xs text-primary hover:text-primary-hover font-medium flex items-center transition-colors active:scale-95">
              <span class="material-symbols-outlined text-[16px] mr-1">my_location</span>
              <span i18n="@@settingsBtnGetLocation">Get Current Location</span>
            </button>
          </div>
          <div class="h-[235px] w-full rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden relative group" #mapContainer>
            <!-- Leaflet Map Container -->
          </div>
        </div>
      </div>
    </section>
  `
})
export class BusinessProfileComponent {
  location = input.required<AdminLocation>();
  ownerInfo = input.required<OwnerInfo>();
  
  updateLocation = output<AdminLocation>();
  updateOwnerInfo = output<OwnerInfo>();
  save = output<void>();

  mapContainer = viewChild<ElementRef<HTMLDivElement>>('mapContainer');
  map: L.Map | undefined;
  marker: L.Marker | undefined;

  constructor() {
    effect(() => {
      const container = this.mapContainer()?.nativeElement;
      if (container && !this.map) {
        this.initMap(container);
      }
    });

    effect(() => {
      const loc = this.location();
      if (this.map && this.marker && loc && loc.latitude && loc.longitude) {
        this.map.setView([loc.latitude, loc.longitude], this.map.getZoom() || 15);
        this.marker.setLatLng([loc.latitude, loc.longitude]);
      }
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.onLocationChange('latitude', position.coords.latitude);
          this.onLocationChange('longitude', position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Could not get your location. Please check browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private initMap(container: HTMLDivElement) {
    const defaultLat = this.location()?.latitude || 38.53575;
    const defaultLng = this.location()?.longitude || 68.77905;

    // Fix leaflet default icon paths
    const iconDefault = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map = L.map(container).setView([defaultLat, defaultLng], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', (event) => {
      const marker = event.target;
      const position = marker.getLatLng();
      this.onLocationChange('latitude', position.lat);
      this.onLocationChange('longitude', position.lng);
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.onLocationChange('latitude', event.latlng.lat);
      this.onLocationChange('longitude', event.latlng.lng);
    });
  }

  onLocationChange(field: keyof AdminLocation, value: any) {
    this.updateLocation.emit({ ...this.location(), [field]: value });
  }

  onOwnerInfoChange(field: keyof OwnerInfo, value: any) {
    this.updateOwnerInfo.emit({ ...this.ownerInfo(), [field]: value });
  }
}
