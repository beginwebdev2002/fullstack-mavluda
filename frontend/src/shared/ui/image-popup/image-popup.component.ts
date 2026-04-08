import { NgOptimizedImage } from "@angular/common";
import { Component, input, output, signal, ChangeDetectionStrategy, effect } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-image-popup",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./image-popup.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePopupComponent {
  imageUrl = input.required<string | null>();
  title = input<string>("Mavluda Beauty • Portfolio");
  loadingText = input<string>("Loading Asset");
  close = output<void>();

  isLoading = signal(true);

  constructor() {
    effect(() => {
      if (this.imageUrl()) {
        this.isLoading.set(true);
      }
    });
  }

  onImageLoad() {
    this.isLoading.set(false);
  }

  onClose() {
    this.close.emit();
  }
}
