import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService, Department } from '../../services/department.service';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './department-list.html',
})
export class DepartmentList implements OnInit {
  private departmentService = inject(DepartmentService);

  departments: Department[] = [];
  newName = '';
  editingId: number | null = null;
  editingName = '';
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.departmentService.getAll().subscribe({
      next: data => (this.departments = data),
      error: () => (this.error = 'Failed to load departments.'),
    });
  }

  add(): void {
    if (!this.newName.trim()) return;
    this.loading = true;
    this.departmentService.create({ name: this.newName.trim() }).subscribe({
      next: dept => {
        this.departments.push(dept);
        this.newName = '';
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to create department.';
        this.loading = false;
      },
    });
  }

  startEdit(dept: Department): void {
    this.editingId = dept.id!;
    this.editingName = dept.name;
  }

  saveEdit(dept: Department): void {
    if (!this.editingName.trim()) return;
    this.departmentService.update(dept.id!, { name: this.editingName.trim() }).subscribe({
      next: updated => {
        dept.name = updated.name;
        this.editingId = null;
      },
      error: () => (this.error = 'Failed to update department.'),
    });
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  delete(dept: Department): void {
    if (!confirm(`Delete department "${dept.name}"?`)) return;
    this.departmentService.delete(dept.id!).subscribe({
      next: () => (this.departments = this.departments.filter(d => d.id !== dept.id)),
      error: () => (this.error = 'Failed to delete department.'),
    });
  }
}
