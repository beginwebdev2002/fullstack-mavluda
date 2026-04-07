import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
})
export class EntityCardComponent {
  @Input() entity: any;
  @Input() imageUrlPath: string = 'image';
  @Input() titlePath: string = 'name';
  @Input() descriptionPath: string = 'description';

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  get imageUrl(): string {
    return this.entity ? this.entity[this.imageUrlPath] : '';
  }

  get title(): string {
    return this.entity ? this.entity[this.titlePath] : '';
  }

  get description(): string {
    return this.entity ? this.entity[this.descriptionPath] : '';
  }

  onEdit() {
    this.edit.emit(this.entity);
  }

  onDelete() {
    this.delete.emit(this.entity);
  }
}
