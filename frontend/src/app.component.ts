import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "@features/user";
import { GlobalErrorComponent } from "@shared/ui";


@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, GlobalErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  async ngOnInit() {
  }
}
