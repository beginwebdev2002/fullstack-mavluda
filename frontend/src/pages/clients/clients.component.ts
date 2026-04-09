import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '@entities/user';
import { ClientFormComponent } from '@features/client-form';
import { ListViewComponent, ListViewColumn } from '@shared/ui';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, ClientFormComponent, ListViewComponent],
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsPageComponent implements OnInit {
  private userService = inject(UserService);

  clients = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  columns = signal<ListViewColumn[]>([
    { key: 'computedFullName', label: 'Name', type: 'text' },
    { key: 'computedContact', label: 'Contact', type: 'text' },
    { key: 'role', label: 'Role', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ]);

  // Form state
  isModalOpen = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  editingId = signal<string | null>(null);
  
  formData = signal<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: 'user',
  });

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading.set(true);
    this.error.set(null);
    this.userService.getUsers().subscribe({
      next: (users) => {
        // Map to include computed fields for the ListView
        const mappedUsers = users.filter(u => u.role === 'user').map(u => ({
          ...u,
          computedFullName: `${u.firstName} ${u.lastName || ''}`.trim(),
          computedContact: u.email || u.username || 'No contact provided'
        }));
        this.clients.set(mappedUsers);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load clients.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  openCreate() {
    this.resetForm();
    this.isEditing.set(false);
    this.editingId.set(null);
    this.isModalOpen.set(true);
  }

  openEdit(client: User | any) {
    this.isEditing.set(true);
    this.editingId.set(client.id);
    this.formData.set({
      firstName: client.firstName,
      lastName: client.lastName || '',
      email: client.email || '',
      username: client.username || '',
      role: client.role,
    });
    this.isModalOpen.set(true);
  }

  saveClient(payload: { data: Partial<User> & { password?: string }; file: File | null }) {
    if (!payload.data.firstName) return;

    this.loading.set(true);

    let submitData: Partial<User> | FormData;

    if (payload.file || payload.data.password) {
      const formData = new FormData();
      Object.keys(payload.data).forEach(key => {
        const val = (payload.data as any)[key];
        if (val !== undefined && val !== null && val !== '') {
          formData.append(key, val);
        }
      });
      if (payload.file) {
        formData.append('file', payload.file);
      }
      submitData = formData;
    } else {
      submitData = payload.data;
    }

    if (this.isEditing() && this.editingId()) {
      this.userService.updateUser(this.editingId()!, submitData).subscribe({
        next: () => {
          this.loadClients();
          this.resetForm();
        },
        error: (err) => {
          this.error.set('Failed to update client.');
          this.loading.set(false);
        }
      });
    } else {
      this.userService.createUser(submitData).subscribe({
        next: () => {
          this.loadClients();
          this.resetForm();
        },
        error: (err) => {
          this.error.set('Failed to create client.');
          this.loading.set(false);
        }
      });
    }
  }

  deleteClient(id: string) {
    if (!confirm('Are you sure you want to delete this client?')) return;
    this.loading.set(true);
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadClients(),
      error: (err) => {
         this.error.set('Failed to delete client.');
         this.loading.set(false);
      }
    });
  }

  resetForm() {
    this.formData.set({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      role: 'user',
    });
    this.isEditing.set(false);
    this.editingId.set(null);
    this.isModalOpen.set(false);
  }
}
