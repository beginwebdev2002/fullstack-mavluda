import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-standard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FDFBF7] font-display flex flex-col">
      <nav class="bg-[#0A0A0A] border-b border-[#D4AF37] shadow-gold px-4 py-3 sm:px-6 lg:px-8 w-full sticky top-0 z-50">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a routerLink="/" class="flex items-center">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#D4AF37] font-serif">Mavluda Beauty</span>
          </a>
          <div class="flex items-center md:order-2">
            <button type="button" class="text-[#FDFBF7] bg-[#D4AF37] hover:bg-[#b59124] focus:ring-4 focus:ring-[#D4AF37]/50 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 focus:outline-none transition-colors shadow-glow btn-glow">Book VIP</button>
            <button data-collapse-toggle="mega-menu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#D4AF37] rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" aria-controls="mega-menu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
          </div>
          <div id="mega-menu" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul class="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
              <li>
                <a routerLink="/" class="block py-2 pl-3 pr-4 text-[#D4AF37] border-b border-gray-700 md:border-0 md:hover:text-[#FDFBF7] md:p-0 transition-colors" aria-current="page">Home</a>
              </li>
              <li>
                <a routerLink="/treatments" class="block py-2 pl-3 pr-4 text-gray-300 border-b border-gray-700 hover:text-[#D4AF37] md:border-0 md:hover:text-[#D4AF37] md:p-0 transition-colors">Treatments</a>
              </li>
              <li>
                <a routerLink="/veils" class="block py-2 pl-3 pr-4 text-gray-300 border-b border-gray-700 hover:text-[#D4AF37] md:border-0 md:hover:text-[#D4AF37] md:p-0 transition-colors">Wedding Dresses</a>
              </li>
              <li>
                <a routerLink="/portfolio" class="block py-2 pl-3 pr-4 text-gray-300 border-b border-gray-700 hover:text-[#D4AF37] md:border-0 md:hover:text-[#D4AF37] md:p-0 transition-colors">Portfolio</a>
              </li>
              <li>
                <a routerLink="/about" class="block py-2 pl-3 pr-4 text-gray-300 hover:text-[#D4AF37] md:hover:text-[#D4AF37] md:p-0 transition-colors">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
        <router-outlet></router-outlet>
      </main>

      <footer class="p-4 bg-[#0A0A0A] border-t border-gray-800 shadow md:p-8 lg:p-10 w-full mt-auto">
          <div class="mx-auto max-w-screen-xl text-center">
              <a href="#" class="flex justify-center items-center text-2xl font-semibold text-[#D4AF37] font-serif mb-4">
                  Mavluda Beauty
              </a>
              <p class="my-6 text-gray-400">Luxury Medical & Bridal Ecosystem.</p>
              <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-300">
                  <li>
                      <a href="#" class="mr-4 hover:text-[#D4AF37] md:mr-6 transition-colors">About</a>
                  </li>
                  <li>
                      <a href="#" class="mr-4 hover:text-[#D4AF37] md:mr-6 transition-colors">Premium Treatments</a>
                  </li>
                  <li>
                      <a href="#" class="mr-4 hover:text-[#D4AF37] md:mr-6 transition-colors">Bridal Collection</a>
                  </li>
                  <li>
                      <a href="#" class="mr-4 hover:text-[#D4AF37] md:mr-6 transition-colors">Contact</a>
                  </li>
              </ul>
              <span class="text-sm text-gray-400 sm:text-center">© 2024-2025 <a href="#" class="hover:text-[#D4AF37] transition-colors">Mavluda Beauty™</a>. All Rights Reserved.</span>
          </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
  `]
})
export class StandardLayoutComponent {}
