import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorService } from "@shared/services";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-global-error",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (errorService.error()) {
      <div
        @fadeInOut
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="bg-white rounded-lg shadow-2xl max-w-sm w-full overflow-hidden border border-red-100">
          <div class="p-5 flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-red-500 text-2xl">error</span>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">
              Error
              {{
                errorService.error()?.statusCode
                  ? "(" + errorService.error()?.statusCode + ")"
                  : ""
              }}
            </h3>
            <p class="text-sm text-gray-500 whitespace-pre-line mb-6">
              {{ errorService.error()?.message }}
            </p>
            <button
              (click)="close()"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate(
          "300ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" }),
        ),
      ]),
      transition(":leave", [
        animate(
          "200ms ease-in",
          style({ opacity: 0, transform: "translateY(-20px)" }),
        ),
      ]),
    ]),
  ],
})
export class GlobalErrorComponent {
  errorService = inject(ErrorService);

  close() {
    this.errorService.clearError();
  }
}
