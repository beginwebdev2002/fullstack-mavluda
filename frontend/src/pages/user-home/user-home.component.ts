import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "@core/constants";

@Component({
  selector: "app-user-home",
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.scss"],
})
export class UserHomeComponent implements OnInit {
  http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get(API_ENDPOINTS.ADMIN.SETTINGS).subscribe((res) => {
      console.log(res);
    });
  }
}
