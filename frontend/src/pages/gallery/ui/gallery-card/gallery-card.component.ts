import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  OnInit,
} from "@angular/core";
import { Gallery } from "@shared/models";

@Component({
  selector: "app-gallery-card",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./gallery-card.component.html",
})
export class GalleryCardComponent implements OnInit {
  image = input.required<Gallery>();
  index = input<number>(0);
  
  edit = output<Gallery>();
  viewImage = output<string>();
  deleteCard = output<string>();

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit(this.image());
  }

  onViewImage() {
    this.viewImage.emit(this.image().imageUrl);
  }

  onDeleteCard() {
    this.deleteCard.emit(this.image().id);
  }
}
