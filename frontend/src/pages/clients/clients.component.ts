import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  membership: 'Platinum VIP' | 'Gold Tier' | 'Silver Tier';
  lastVisit: string;
  totalSpend: number;
  avatarType: 'image' | 'icon' | 'initials';
  avatarUrl?: string; // If 'image'
  initials?: string; // If 'initials'
}

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsPageComponent {
  clients = signal<Client[]>([
    {
      id: '#CL-8902',
      name: 'Elena Kuznetsova',
      phone: '+7 (900) 123-45-67',
      email: 'elena.k@example.com',
      membership: 'Platinum VIP',
      lastVisit: 'Oct 24, 2024',
      totalSpend: 12450.00,
      avatarType: 'image',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '#CL-8905',
      name: 'Alina Ivanova',
      phone: '+7 (901) 987-65-43',
      email: 'ivanova.alina@test.ru',
      membership: 'Gold Tier',
      lastVisit: 'Oct 20, 2024',
      totalSpend: 4200.00,
      avatarType: 'icon'
    },
    {
      id: '#CL-8911',
      name: 'Sarah Jenkins',
      phone: '+44 20 7946 0958',
      email: 'sarah.j@outlook.com',
      membership: 'Silver Tier',
      lastVisit: 'Sep 30, 2024',
      totalSpend: 1850.00,
      avatarType: 'image',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '#CL-8940',
      name: 'Olga Kareva',
      phone: '+7 (905) 555-44-33',
      email: 'okareva@mail.ru',
      membership: 'Platinum VIP',
      lastVisit: 'Oct 22, 2024',
      totalSpend: 15200.00,
      avatarType: 'initials',
      initials: 'OK'
    }
  ]);

  totalClients = signal(152);
  
}
