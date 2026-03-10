import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreatmentItem } from "@features/treatments";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-treatment-card",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./treatment-card.component.html",
})
export class TreatmentCardComponent {
  treatment = input.required<TreatmentItem>();
  index = input<number>(0);

  edit = output<TreatmentItem>();
  delete = output<string | number>();

  imageUrl = computed(() => linkServerConvert(this.treatment().image || ""));

  onEdit() {
    this.edit.emit(this.treatment());
  }

  onDelete() {
    this.delete.emit(this.treatment().id);
  }
}
