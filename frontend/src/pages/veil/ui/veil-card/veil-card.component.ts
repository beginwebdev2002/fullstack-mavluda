import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { environment } from "@environments/environment";
import { Veil } from "@features/veil";

@Component({
  selector: "app-veil-card",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./veil-card.component.html",
  styleUrl: "./veil-card.component.scss",
})
export class VeilCardComponent implements OnInit {
  veil = input.required<Veil>();
  index = input<number>(0);
  edit = output<Veil>();
  viewImage = output<string>();
  env = signal(environment);

  ngOnInit(): void {}

  safeImageUrl(): string {
    return this.veil().images && this.veil().images.length > 0
      ? this.env().apiUrl + this.veil().images[0]
      : "assets/placeholder-gown.png";
  }

  onEdit() {
    this.edit.emit(this.veil());
  }

  onViewImage() {
    this.viewImage.emit(this.safeImageUrl());
  }
}
