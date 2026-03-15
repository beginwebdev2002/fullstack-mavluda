import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnInit,
  signal,
  linkedSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TreatmentItem } from "@features/treatments";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-treatment-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./treatment-form.component.html",
})
export class TreatmentFormComponent implements OnInit {
  treatment = input.required<TreatmentItem>();

  save = output<FormData>();
  cancel = output<void>();

  tempTreatment = signal<TreatmentItem>({} as TreatmentItem);

  selectedFile = signal<File | null>(null);
  previewImage = linkedSignal(() =>
    this.treatment()?.imageUrl ? linkServerConvert(this.treatment()?.imageUrl) : "public/images/treatments-add-img.png",
  );

  ngOnInit() {
    this.tempTreatment.set({ ...this.treatment() });
  }

  closeEditModal() {
    this.cancel.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  saveEdit() {
    const formData = new FormData();
    console.log('treatments: ', this.tempTreatment());
    
    Object.entries(this.tempTreatment()).forEach(([key, value]) => {
      if (key === "id" && value === "") return;
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    if (this.selectedFile()) {
      formData.append("image", this.selectedFile() as File);
    }

    this.save.emit(formData);
  }

  toggleTempActive() {
    this.tempTreatment.update((t) => ({ ...t, active: !t.active }));
  }
}
