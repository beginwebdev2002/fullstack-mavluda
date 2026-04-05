import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdditionalLink {
  id: number;
  label: string;
  targetUrl: string;
  category: string;
  categoryColor: 'blue' | 'green';
}

@Component({
  selector: 'app-additional-links',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden animate-page-enter">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-primary mr-3">link</span>
          <h4 class="font-serif text-xl font-semibold text-gray-900" i18n="@@settingsSectionLinks">Additional Links</h4>
        </div>
        <button (click)="addLink.emit()" class="flex items-center px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-lg text-sm font-medium transition-all">
          <span class="material-symbols-outlined text-sm mr-2">add</span> <span i18n="@@settingsBtnAddLink">Add New Link</span>
        </button>
      </div>
      <div class="p-8">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th class="pb-4 px-4" i18n="@@settingsTableLabel">Label</th>
                <th class="pb-4 px-4" i18n="@@settingsTableTarget">Target URL</th>
                <th class="pb-4 px-4" i18n="@@settingsTableCategory">Category</th>
                <th class="pb-4 px-4 text-right" i18n="@@settingsTableAction">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              @for(link of links(); track link.id; let i = $index){
                <tr class="group hover:bg-gray-50 transition-colors reveal-item" [style.animation-delay.ms]="i * 50">
                  <td class="py-4 px-4">
                    <input 
                      class="bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900" 
                      type="text" 
                      [ngModel]="link.label"
                      (ngModelChange)="onUpdate(link.id, 'label', $event)"
                    />
                  </td>
                  <td class="py-4 px-4 text-sm text-primary underline truncate max-w-xs">
                    {{link.targetUrl}}
                  </td>
                  <td class="py-4 px-4">
                    <span class="px-2 py-1 text-[10px] font-bold uppercase rounded tracking-wider" [class]="link.categoryColor === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'">
                      {{link.category}}
                    </span>
                  </td>
                  <td class="py-4 px-4 text-right">
                    <button (click)="removeLink.emit(link.id)" class="text-gray-400 hover:text-red-500 transition-colors">
                      <span class="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `
})
export class AdditionalLinksComponent {
  links = input.required<AdditionalLink[]>();
  
  addLink = output<void>();
  removeLink = output<number>();
  updateLink = output<AdditionalLink>();

  onUpdate(id: number, field: keyof AdditionalLink, value: any) {
    const link = this.links().find(l => l.id === id);
    if (link) {
      this.updateLink.emit({ ...link, [field]: value });
    }
  }
}
