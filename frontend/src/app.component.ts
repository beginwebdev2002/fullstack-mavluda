import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "@shared/services";
import { TelegramService } from "@shared/services";
import { GlobalErrorComponent } from "@shared/ui";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, GlobalErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public authService = inject(AuthService);
  public telegramService = inject(TelegramService);

  ngOnInit() {
    this.telegramService.ready();
    this.telegramService.expand();

    // Delegate auth logic to the comprehensive AuthService
    this.authService.checkTelegramAuth();
  }
}
