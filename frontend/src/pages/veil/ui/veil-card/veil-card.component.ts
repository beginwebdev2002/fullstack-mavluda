import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  styleUrls: ["./veil-card.component.scss"],
})
export class VeilCardComponent implements OnInit {
  veil = input.required<Veil>();
  index = input<number>(0);
  edit = output<Veil>();
  viewImage = output<string>();
  env = signal(environment);
  safeImageUrl = computed(() => {
    return this.veil().image
      ? this.env().apiUrl + this.veil().image
      : "assets/placeholder-veil.png";
  });

  ngOnInit(): void {}
  onEdit() {
    this.edit.emit(this.veil());
  }
  onViewImage() {
    this.viewImage.emit(this.safeImageUrl());
  }
}
