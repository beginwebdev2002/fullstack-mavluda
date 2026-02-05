
import { Component, signal, input, computed, ChangeDetectionStrategy, inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Language {
  code: string;
  label: string;
  flagCode: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  variant = input<'light' | 'dark'>('light');
  isOpen = signal(false);
  
  private locale = inject(LOCALE_ID);
  
  languages: Language[] = [
    { code: 'ru', label: 'Русский', flagCode: 'ru' },
    { code: 'en', label: 'English', flagCode: 'us' },
    { code: 'tj', label: 'Тоҷикӣ', flagCode: 'tj' }
  ];

  // Initialize current language based on LOCALE_ID
  currentLang = signal<Language>(
    this.languages.find(l => this.locale.startsWith(l.code)) || this.languages.find(l => l.code === 'en') || this.languages[0]
  );

  // Computed classes to avoid JIT parser errors with '/' characters in template bindings
  buttonThemeClasses = computed(() => {
    return this.variant() === 'light'
      ? 'hover:bg-gray-100 hover:border-gray-200 text-gray-700'
      : 'hover:bg-white/10 hover:border-white/20 text-white';
  });

  iconThemeClasses = computed(() => {
    return this.variant() === 'light'
      ? 'text-gray-400'
      : 'text-white/70';
  });

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  selectLanguage(lang: Language) {
    this.isOpen.set(false);
    
    // In development or when using localize: true, the paths might be /en/, /ru/, /tj-TJ/ etc.
    // For native i18n, we assume the app is served from /{locale}/
    // We need to redirect to the same path but with a different locale prefix.
    
    // Simple localization strategy:
    // If we are at /ru/dashboard, switch to /en/dashboard.
    // We can assume the base href handles the locale part.
    // Window.location.href approach:
    
    const currentPath = window.location.pathname; // e.g., "/ru/dashboard"
    const currentSearch = window.location.search;
    
    // Check if the current path starts with one of our locales
    // Note: LOCALE_ID might be 'ru-RU', but my language code is 'ru'.
    // Setup in angular.json uses 'ru-RU' and 'tg-TJ' and 'en-US'.
    // The baseHref usually matches the locale name provided in angular.json or just the language code if customized.
    // By default `ng build --localize` uses the LOCALE_ID as the folder name.
    
    // Map minimal codes to full locales if necessary?
    // In angular.json I defined 'en-US', 'ru-RU', 'tg-TJ'. 
    // Usually the URL becomes /en-US/, /ru-RU/, /tg-TJ/. But users often want /en/, /ru/.
    // Unless I set "baseHref": "/ru/" in current configuration which I didn't yet.
    // I will assume standard behavior: /ru-RU/ etc. Or I should have configured simpler codes?
    // User requested: "ru-RU (Russian - ...)", "tg-TJ ...".
    // I will assume strict locale codes for now.
    
    let targetLocale = '';
    switch(lang.code) {
      case 'ru': targetLocale = 'ru'; break;
      case 'tj': targetLocale = 'tg'; break;
      case 'en': targetLocale = 'en-US'; break;
      default: targetLocale = 'en-US';
    }

    // Determine current locale segment to replace
    // This is tricky without knowing exact deployment. 
    // Assuming simple replacement of the first segment if it matches a known locale, 
    // or prepending if valid.
    
    // However, simplest way effectively used in many projects:
    const port = window.location.port ? `:${window.location.port}` : '';
    const origin = `${window.location.protocol}//${window.location.hostname}${port}`;
    
    // For now, I will blindly replace the first segment if it looks like a locale, or just set it.
    // IF we are developing and running multiple ports, this logic is different.
    // BUT user asked for "native Angular i18n localized bundles" logic.
    
    // let's try to construct the new URL using a hard redirect to the matching localized build.
    // Assuming builds are deployed at /en-US/, /ru-RU/ etc.
    
    // But wait, if I serve locally, I usually serve one locale.
    // I cannot switch locale without reloading a different port or app.
    // The user's prompt says "Logic: Implement a language switcher feature in the header component using window.location.href redirection".
    
    // I'll implement a logic that assumes standard deployment: /LOCALE/route.
    
    let newPath = currentPath;
    const segments = currentPath.split('/').filter(Boolean);
    const possibleLocales = ['en-US', 'ru', 'tg', 'en', 'ru-RU', 'tg-TJ'];
    
    if (possibleLocales.includes(segments[0])) {
      segments[0] = targetLocale;
      newPath = '/' + segments.join('/');
    } else {
      // If no locale in path, assume we are at root and need to prepend? 
      // Or maybe we are in source locale (no prefix).
      newPath = '/' + targetLocale + currentPath;
    }
    
    window.location.href = origin + newPath + currentSearch;
  }
}
