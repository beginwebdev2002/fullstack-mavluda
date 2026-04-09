import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card.component';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, EntityCardComponent],
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent {
  @Input() entities: any[] = [];
  @Input() imageUrlPath: string = 'image';
  @Input() titlePath: string = 'name';
  @Input() descriptionPath: string = 'description';

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(entity: any) {
    this.edit.emit(entity);
  }

  onDelete(entity: any) {
    this.delete.emit(entity);
  }
}
