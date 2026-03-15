import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  OnInit,
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
  styleUrl: "./treatment-card.component.scss",
})
export class TreatmentCardComponent implements OnInit{
  treatment = input.required<TreatmentItem>();
  index = input<number>(0);

  edit = output<TreatmentItem>();
  delete = output<string | number>();

  imageUrl = computed(() => this.treatment().imageUrl ? linkServerConvert(this.treatment().imageUrl) : "public/images/treatments-no-img.png");
  ngOnInit(): void {
    console.log('image: ', this.treatment());
    
  }

  onEdit() {
    this.edit.emit(this.treatment());
  }

  onDelete() {
    this.delete.emit(this.treatment().id);
  }
}
