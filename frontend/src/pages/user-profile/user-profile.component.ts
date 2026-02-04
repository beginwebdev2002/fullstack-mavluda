
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user = {
    name: 'Sophia Anderson',
    id: 'MA-8821',
    status: $localize`:@@userStatusGold:Gold Member`,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD08o6hF5_pbFiIJqYs4VYYrPPviAtlB2PjR4z2lZYzuT3rcSqK7UbUQNiOic7Y-5L8OgQjXfDI3pcgi0scXP-E6zXsJwv5g2J3sX89thdN8QagJQQCwGJWt96_rVAjbhNezpl35TsKsDKDFcyUdrK2qT0yPcFM3kP0hOXpqC8ZB7OFulzRzNGWHZR0Hw2QbGd77Id8wWieXLWUC7eU1JKb3MgO6TXvXzAJQth53BY6a91dqAL2kuvJKelagAgLC2sRUWQy1FQ6Ul7i'
  };

  upcomingAppointment = {
    status: $localize`:@@apptStatusConfirmed:Confirmed`,
    date: $localize`:@@apptDate:October 28, 2024`,
    time: '10:00 AM - 11:30 AM',
    service: $localize`:@@apptService:Full Face Rejuvenation`
  };
  
  loyalty = {
    tier: $localize`:@@loyaltyTierGold:Gold Tier`,
    points: 1250,
    pointsToNext: 750,
    progress: 65,
    nextReward: $localize`:@@loyaltyReward:Comp. Skin Analysis`
  };
  
  recentProcedures = [
    { date: 'Sep 15, 2024', service: $localize`:@@procHydra:HydraFacial Elite`, category: $localize`:@@catSkin:Skin Therapy`, specialist: 'Dr. Azizova', status: $localize`:@@statusView:View Results`, link: '#' },
    { date: 'Aug 02, 2024', service: $localize`:@@procBotox:Botulinum Therapy`, category: $localize`:@@catMedical:Medical Aesthetics`, specialist: 'Dr. Azizova', status: $localize`:@@statusView:View Results`, link: '#' },
    { date: 'Jun 18, 2024', service: $localize`:@@procGlamour:Evening Glamour`, category: $localize`:@@catVisage:Professional Visage`, specialist: 'Elena V.', status: $localize`:@@statusArchived:Archived`, link: '#' }
  ];
  
  latestNote = {
    summary: $localize`:@@noteSummary:Skin sensitivity slightly elevated during last session. Recommended reducing retinol usage frequency to 2x/week for the next 14 days. Hydration levels have improved significantly since August.`,
    recorder: 'Dr. Mavluda Azizova',
    date: 'Sep 15, 2024'
  };
  
  today = {
    date: 'October 24, 2024'
  };
}
