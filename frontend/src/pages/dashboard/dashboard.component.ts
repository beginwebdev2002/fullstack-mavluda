
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@entities/user/user.service';
import { VeilService } from '@entities/veil/veil.service';
import { GalleryService } from '@entities/gallery/gallery.service';
import { TreatmentsService } from '@entities/treatments/treatments.service';
import { firstValueFrom } from 'rxjs';

interface StatCard {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}

interface Activity {
  id: number;
  text: string;
  target: string;
  time: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [VeilService, UserService, GalleryService, TreatmentsService]
})
export class DashboardComponent implements OnInit {
  private userService = inject(UserService);
  private veilService = inject(VeilService);
  private galleryService = inject(GalleryService);
  private treatmentsService = inject(TreatmentsService);

  stats = signal<StatCard[]>([
    { title: $localize`:@@dashboardStatUsers:Total Users`, value: '...', trend: '', trendUp: true, icon: 'group' },
    { title: $localize`:@@dashboardStatVeils:Total Veils`, value: '...', trend: '', trendUp: true, icon: 'checkroom' },
    { title: $localize`:@@dashboardStatGallery:Gallery Images`, value: '...', trend: '', trendUp: true, icon: 'collections' },
    { title: $localize`:@@dashboardStatTreatments:Total Treatments`, value: '...', trend: '', trendUp: true, icon: 'spa' }
  ]);

  chartBars = signal<{ height: number; value: number; highlight?: boolean }[]>([
    { height: 30, value: 12 }, { height: 45, value: 18 }, { height: 35, value: 14 },
    { height: 60, value: 25 }, { height: 50, value: 20 }, { height: 80, value: 32, highlight: true },
    { height: 65, value: 26 }, { height: 40, value: 16 }, { height: 55, value: 22 }
  ]);

  chartLabels = signal<string[]>(['1 Oct', '5 Oct', '10 Oct', '15 Oct', '20 Oct', '24 Oct']);

  activities = signal<Activity[]>([
    { id: 1, text: $localize`:@@dashboardActivityAppt:New appointment booked`, target: 'Sarah J.', time: $localize`:@@time2mAgo:2m ago`, icon: 'person', color: 'bg-primary' },
    { id: 2, text: $localize`:@@dashboardActivityInventory:Inventory alert`, target: 'Botox Vials', time: $localize`:@@time1hAgo:1h ago`, icon: 'warning', color: 'bg-red-500' },
    { id: 3, text: $localize`:@@dashboardActivityService:Service completed`, target: 'Hydrofacial', time: $localize`:@@time3hAgo:3h ago`, icon: 'check', color: 'bg-green-500' },
    { id: 4, text: $localize`:@@dashboardActivityStock:Veil stock updated`, target: 'VL-LACE-042', time: $localize`:@@time5hAgo:5h ago`, icon: 'edit', color: 'bg-blue-500' }
  ]);

  async ngOnInit() {
    try {
      const [users, veils, gallery, treatments] = await Promise.all([
        firstValueFrom(this.userService.getCount()),
        firstValueFrom(this.veilService.getCount()),
        firstValueFrom(this.galleryService.getCount()),
        firstValueFrom(this.treatmentsService.getCount())
      ]);

      this.stats.set([
        { title: $localize`:@@dashboardStatUsers:Total Users`, value: users.toString(), trend: '+5%', trendUp: true, icon: 'group' },
        { title: $localize`:@@dashboardStatVeils:Total Veils`, value: veils.toString(), trend: '+12%', trendUp: true, icon: 'checkroom' },
        { title: $localize`:@@dashboardStatGallery:Gallery Images`, value: gallery.toString(), trend: '+8%', trendUp: true, icon: 'collections' },
        { title: $localize`:@@dashboardStatTreatments:Total Treatments`, value: treatments.toString(), trend: '+15%', trendUp: true, icon: 'spa' }
      ]);
    } catch (e) {
      console.error('Failed to load dashboard stats', e);
    }
  }
}
