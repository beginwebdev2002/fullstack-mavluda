import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import {
  resetVeilData,
  Veil,
  veilFormData,
  veilValidationSchema,
} from "@features/veil";
import { linkServerConvert } from "@shared/lib";

@Component({
  selector: "app-veil-form",
  standalone: true,
  imports: [CommonModule, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./veil-form.component.html",
})
export class VeilFormComponent implements OnInit {
  veil = input.required<Veil>();

  // Dynamic select lists from admin settings (passed from parent)
  silhouettes = input<string[]>([]);
  necklines = input<string[]>([]);
  fabrics = input<string[]>([]);
  trainLengths = input<string[]>([]);
  categories = input<string[]>([]);

  save = output<{ data: any; file: File | null }>();
  cancel = output<void>();
  veilModel = signal<Veil>(veilFormData);
  veilForm = form<Veil>(this.veilModel, veilValidationSchema);
  selectedFile = signal<File | null>(null);
  previewImage = linkedSignal(() => this.veil()?.image || null);
  isEditMode = signal(false);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.veil()) {
      this.isEditMode.set(true);
      this.previewImage.set(linkServerConvert(this.veil().image));
      this.veilModel.set(this.veil());
    } else {
      this.isEditMode.set(false);
      this.veilModel.set(veilFormData);
    }
  }

  resetForm() {
    this.isEditMode.set(false);
    this.selectedFile.set(null);
    this.previewImage.set(null);
    this.veilModel.set(resetVeilData);
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

  onSubmit() {
    if (this.veilForm().valid()) {
      this.save.emit({
        data: this.veilForm().value(),
        file: this.selectedFile(),
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
