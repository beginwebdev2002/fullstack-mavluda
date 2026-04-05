import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden animate-page-enter">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-primary mr-3">auto_awesome</span>
          <h4 class="font-serif text-xl font-semibold text-gray-900" i18n="@@settingsSectionGeneral">General Info & Philosophy</h4>
        </div>
        <button (click)="save.emit()" class="flex items-center px-4 py-2 bg-primary hover:bg-primary-hover text-black rounded-lg text-sm font-medium transition-all shadow-md btn-primary-shimmer active:scale-[0.98]" i18n="@@settingsBtnSave">
          Save Changes
        </button>
      </div>
      <div class="p-8 space-y-8">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider" i18n="@@settingsLabelBio">Center Biography (Multi-language)</label>
          <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-inner">
            <div class="bg-gray-50 p-2 flex border-b border-gray-200">
              <button class="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"><span class="material-symbols-outlined text-sm">format_bold</span></button>
              <button class="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"><span class="material-symbols-outlined text-sm">format_italic</span></button>
              <button class="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"><span class="material-symbols-outlined text-sm">format_underlined</span></button>
              <div class="w-px h-6 bg-gray-200 mx-2"></div>
              <button class="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"><span class="material-symbols-outlined text-sm">format_list_bulleted</span></button>
              <button class="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"><span class="material-symbols-outlined text-sm">link</span></button>
            </div>
            <textarea 
              class="w-full p-6 bg-white border-none focus:ring-0 text-sm leading-relaxed text-gray-900" 
              placeholder="Write the biography..." 
              rows="6"
              [ngModel]="biography()"
              (ngModelChange)="updateBiography.emit($event)"
            ></textarea>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider" i18n="@@settingsLabelPhilosophy">Beauty Philosophy</label>
          <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-inner">
            <div class="bg-gray-50 p-2 flex border-b border-gray-200">
              <button class="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"><span class="material-symbols-outlined text-sm">format_quote</span></button>
            </div>
            <textarea 
              class="w-full p-6 bg-white border-none focus:ring-0 text-sm italic font-serif leading-relaxed text-gray-900" 
              placeholder="Enter your philosophy..." 
              rows="4"
              [ngModel]="philosophy()"
              (ngModelChange)="updatePhilosophy.emit($event)"
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  `
})
export class GeneralInfoComponent {
  biography = input.required<string>();
  philosophy = input.required<string>();
  
  updateBiography = output<string>();
  updatePhilosophy = output<string>();
  save = output<void>();
}
