import { Component, ChangeDetectionStrategy, input, output, TemplateRef, contentChild, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { linkServerConvert } from "@shared/lib";

export interface ListViewColumn {
  key: string;
  label: string;
  type: 'text' | 'image' | 'badge' | 'date' | 'status' | 'actions' | 'custom';
  cssClass?: string;
}

@Component({
  selector: "app-list-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  items = input.required<any[]>();
  columns = input.required<ListViewColumn[]>();
  
  edit = output<any>();
  delete = output<string | number>();
  view = output<any>();

  customCellTemplate = contentChild<TemplateRef<any>>('customCell');

  getStatusClass(status: any): string {
    const s = String(status).toLowerCase();
    if (s === 'published' || s === 'active' || s === 'true') return 'bg-green-100 text-green-800';
    if (s === 'draft' || s === 'inactive' || s === 'false') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  }

  getStatusText(status: any): string {
    const s = String(status).toLowerCase();
    if (s === 'true') return 'Active';
    if (s === 'false') return 'Inactive';
    return status;
  }
}
