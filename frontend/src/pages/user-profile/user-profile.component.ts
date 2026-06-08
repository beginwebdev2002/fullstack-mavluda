import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "@features/user";
import { SessionService } from "@entities/session";

interface SocialHandles {
  telegram: string;
  instagram: string;
  whatsapp: string;
}

interface HistoryItem {
  date: string;
  action: string;
  amount?: number;
  type: "deposit" | "spend" | "booking" | "other";
}

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent {
  private sessionService = inject(SessionService);
  currentUser = this.sessionService.currentUser;

  isEditing = signal(false);
  user = computed(() => {
    const u = this.currentUser();
    return {
      firstName: u?.firstName ?? "",
      lastName: u?.lastName ?? "",
      dob: (u as any)?.dob ?? "",
      photoUrl:
        u?.photoUrl ??
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(`${u?.firstName ?? "U"} ${u?.lastName ?? ""}`) +
          "&background=D4AF35&color=0a0a0a&size=200",
      id: u?.id ? `ID-${u.id.substring(0, 6).toUpperCase()}` : "N/A",
    };
  });

  // Edit form state (local copy while editing)
  editForm = signal({
    firstName: "",
    lastName: "",
    dob: "",
    telegram: "",
    instagram: "",
    whatsapp: "",
  });

  // Social handles (separate signal, would come from user profile API)
  socialHandles = signal<SocialHandles>({
    telegram: (this.currentUser() as any)?.telegram ?? "",
    instagram: (this.currentUser() as any)?.instagram ?? "",
    whatsapp: (this.currentUser() as any)?.whatsapp ?? "",
  });

  // Mock balance (would come from backend)
  balance = signal<number>(2500);

  // Mock history (would come from booking/payment API)
  history = signal<HistoryItem[]>([
    { date: "2024-10-15", action: "Balance top-up", amount: 500, type: "deposit" },
    { date: "2024-10-10", action: "HydraFacial Elite", amount: -850, type: "spend" },
    { date: "2024-09-28", action: "Booking: Evening Glamour", type: "booking" },
    { date: "2024-09-15", action: "Balance top-up", amount: 1000, type: "deposit" },
    { date: "2024-09-02", action: "Botulinum Therapy", amount: -1500, type: "spend" },
  ]);

  startEdit() {
    const u = this.user();
    const s = this.socialHandles();
    this.editForm.set({
      firstName: u.firstName,
      lastName: u.lastName,
      dob: u.dob,
      telegram: s.telegram,
      instagram: s.instagram,
      whatsapp: s.whatsapp,
    });
    this.isEditing.set(true);
  }

  cancelEdit() {
    this.isEditing.set(false);
  }

  saveEdit() {
    const f = this.editForm();
    this.socialHandles.set({
      telegram: f.telegram,
      instagram: f.instagram,
      whatsapp: f.whatsapp,
    });
    // Here you'd call a user update API
    this.isEditing.set(false);
  }

  updateField(field: string, value: string) {
    this.editForm.update((f) => ({ ...f, [field]: value }));
  }

  logout() {
    this.sessionService.logout();
  }
}
