import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "@entities/user";
import { GlobalErrorComponent } from "@shared/ui";
import { API_ENDPOINTS } from "./core/constants";
import { linkMerge } from "@shared/lib";

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
    const link = linkMerge(API_ENDPOINTS.VEILS.URL, "1");

    console.log(link);
  }
}
