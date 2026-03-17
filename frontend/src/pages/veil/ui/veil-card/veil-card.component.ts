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
import { linkServerConvert } from "@shared/lib";

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
  onViewImage = output<string>();
  onDeleteCard = output<string>();
  env = signal(environment);

  safeImageUrl = computed(() => {
    const path = this.veil().image;
    if (!path) return "assets/placeholder-veil.png";
    const isAbsolute = path.startsWith("http") || path.startsWith("blob") || path.includes(this.env().apiUrl);
    return isAbsolute ? path : linkServerConvert(path);
  });

  ngOnInit(): void {}
  onEdit() {
    this.edit.emit(this.veil());
  }
  onViewImageAction() {
    this.onViewImage.emit(this.veil().image || "");
  }

  deleteVeilCard() {
    this.onDeleteCard.emit(this.veil().id);
  }
}

