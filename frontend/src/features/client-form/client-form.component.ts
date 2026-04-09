import { Component, input, output, signal, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '@entities/user';
import { linkServerConvert } from '@shared/lib';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styles: []
})
export class ClientFormComponent {
  isEditing = input<boolean>(false);
  loading = input<boolean>(false);
  formData = input.required<Partial<User> & { password?: string }>();

  save = output<{ data: Partial<User> & { password?: string }; file: File | null }>();
  cancel = output<void>();

  selectedFile = signal<File | null>(null);
  
  previewImage = linkedSignal<Partial<User> & { password?: string }, string | null>({
    source: this.formData,
    computation: (user) => {
      if (user && user.photoUrl) {
        if (user.photoUrl.startsWith('data:') || user.photoUrl.startsWith('http')) {
          return user.photoUrl;
        } else {
          return linkServerConvert(user.photoUrl);
        }
      }
      return null;
    }
  });

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

  onSave() {
    this.save.emit({
      data: this.formData(),
      file: this.selectedFile()
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
