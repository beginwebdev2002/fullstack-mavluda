import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import { environment } from "@environments/environment";
import { linkServerConvert } from "@shared/lib";

export interface CardViewDetail {
  label: string;
  field: string;
  type?: "text" | "date" | "boolean" | "number" | "status";
  trueLabel?: string;
  falseLabel?: string;
}

export interface CardViewConfig {
  imageField: string;
  titleField: string;
  subtitleField?: string;
  priceField?: string;
  currency?: string;
  topRightField?: string;
  topRightType?: "text" | "date" | "price";
  details?: CardViewDetail[];
}

@Component({
  selector: "app-card-view",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./card-view.component.html",
  styleUrls: ["./card-view.component.scss"],
})
export class CardViewComponent {
  data = input.required<any>();
  config = input.required<CardViewConfig>();
  index = input<number>(0);

  edit = output<any>();
  delete = output<string | number>();
  viewImage = output<string>();

  env = signal(environment);

  safeImageUrl = computed(() => {
    const path = this.data()[this.config().imageField];
    if (!path) return "public/images/treatments-no-img.png";
    const isAbsolute =
      path.startsWith("http") ||
      path.startsWith("blob") ||
      path.includes(this.env().apiUrl);
    return isAbsolute ? path : linkServerConvert(path);
  });

  onEdit() {
    this.edit.emit(this.data());
  }

  onViewImageAction() {
    this.viewImage.emit(this.data()[this.config().imageField] || "");
  }

  onDeleteCard() {
    this.delete.emit(this.data().id);
  }
}
