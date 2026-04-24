import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService, AITool } from '../../services/tool.service';
import { AssessmentService } from '../../services/assessment.service';
import { DepartmentService, Department } from '../../services/department.service';

@Component({
  selector: 'app-add-edit-tool',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-edit-tool.html'
})
export class AddEditTool implements OnInit {
  @ViewChild('f') form!: NgForm;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toolService = inject(ToolService);
  private assessmentService = inject(AssessmentService);
  private departmentService = inject(DepartmentService);

  editId: number | null = null;
  error: string | null = null;
  loading = false;
  departments: Department[] = [];

  tool: AITool = {
    name: '',
    vendor: '',
    type: '',
    riskLevel: '',
    personalData: false,
    companyId: 1,
    departmentId: null,
    oversightOwner: '',
    transparencyStatus: 'Not Required'
  };

  q1 = false;
  q2 = false;
  q3 = false;

  ngOnInit(): void {
    this.departmentService.getAll().subscribe({
      next: data => (this.departments = data),
    });

    const toolId = this.route.snapshot.paramMap.get('toolId');
    if (toolId) {
      this.editId = +toolId;
      this.toolService.getAll().subscribe(tools => {
        const found = tools.find(t => t.id === this.editId);
        if (found) this.tool = { ...found };
      });
    }
  }

  get isEdit(): boolean {
    return this.editId !== null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.form.markAllAsTouched();
      return;
    }
    this.error = null;
    this.loading = true;

    if (this.isEdit) {
      this.toolService.update(this.editId!, this.tool).subscribe({
        next: () => this.goBack(),
        error: (err) => {
          this.loading = false;
          this.error = err.message ?? 'Request failed. Is the backend running on localhost:5129?';
        }
      });
    } else {
      this.toolService.create(this.tool).subscribe({
        next: (created) => {
          this.assessmentService.submit({ toolId: created.id!, q1: this.q1, q2: this.q2, q3: this.q3 }).subscribe({
            next: () => this.goBack(),
            error: (err) => {
              this.loading = false;
              this.error = err.message ?? 'Tool created but risk assessment failed.';
            }
          });
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message ?? 'Request failed. Is the backend running on localhost:5129?';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/tools']);
  }
}
