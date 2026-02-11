import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-global-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (errorService.error()) {
      <div 
        @fadeInOut 
        class="fixed top-24 right-6 z-50 max-w-sm w-full bg-white border-l-4 border-red-500 rounded shadow-lg overflow-hidden"
        role="alert">
        <div class="p-4 flex items-start">
          <div class="flex-shrink-0">
            <span class="material-symbols-outlined text-red-500">error</span>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">Error {{ errorService.error()?.statusCode ? '(' + errorService.error()?.statusCode + ')' : '' }}</p>
            <p class="mt-1 text-sm text-gray-500 whitespace-pre-line">{{ errorService.error()?.message }}</p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button (click)="close()" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <span class="sr-only">Close</span>
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ]
})
export class GlobalErrorComponent {
  errorService = inject(ErrorService);

  close() {
    this.errorService.clearError();
  }
}
