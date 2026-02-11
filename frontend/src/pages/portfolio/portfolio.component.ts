
import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GalleryService } from '../../entities/gallery/gallery.service';
import { ImageCategory } from '../../entities/gallery/gallery.model';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioPageComponent implements OnInit {
  private galleryService = inject(GalleryService);
  
  // Align filters with Gallery categories + 'All Works'
  filters: (ImageCategory | 'All Works')[] = ['All Works', 'Visage', 'Medical Spa', 'Bridal Veils', 'Interior', 'Product']; 
  
  // Let's reimplement filters to match Gallery
  categoryFilters: string[] = ['All Works', 'Visage', 'Medical Spa', 'Bridal Veils', 'Interior', 'Product'];
  activeFilter = signal('All Works');

  galleryImages = this.galleryService.images;

  // Computed portfolio items from gallery images
  portfolioItems = computed(() => {
    return this.galleryImages().map(img => ({
      id: img.id,
      imageUrl: img.imageUrl,
      category: img.category,
      title: img.title,
      description: img.alt || img.title, // Use alt or title as description
      statusTag: img.status === 'published' ? 'Available' : undefined,
      aspectClass: this.getRandomAspect(img.id), // Deterministic random for layout
      effects: ''
    }));
  });

  filteredItems = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All Works') {
      return this.portfolioItems();
    }
    return this.portfolioItems().filter(item => item.category === filter);
  });

  ngOnInit() {
    this.galleryService.getImages().subscribe();
  }

  // Helper to give consistent aspect ratio based on ID
  private getRandomAspect(id: string): string {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const aspects = ['aspect-[4/5]', 'aspect-[2/3]', 'aspect-[5/4]', 'aspect-[3/4]', 'aspect-square'];
    return aspects[hash % aspects.length];
  }
}

