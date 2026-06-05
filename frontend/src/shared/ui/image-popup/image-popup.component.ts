import { Component, input, output, signal, ChangeDetectionStrategy, effect, DOCUMENT, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-image-popup",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-popup.component.html",
  styleUrl: "./image-popup.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePopupComponent {
  document = inject(DOCUMENT);
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
    this.document.body.style.overflow = 'hidden';
    this.isLoading.set(false);
  }

  onClose() {
    this.document.body.style.overflow = 'auto';
    this.close.emit();
  }
}
