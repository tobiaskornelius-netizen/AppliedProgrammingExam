import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import {
  DEPARTMENTS,
  UNIVERSAL_QUESTIONS,
  getDepartmentQuestion,
  Question,
} from '../../config/questionnaire.config';

@Component({
  selector: 'app-questionnaire-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './questionnaire-form.html',
})
export class QuestionnaireForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private surveyService = inject(SurveyService);
  private cdr = inject(ChangeDetectorRef);

  token = '';
  validating = true;
  tokenValid = false;
  tokenError = '';

  selectedDepartment = '';
  answers: Record<string, string[]> = {};
  submitting = false;
  submitError = '';

  readonly departments = DEPARTMENTS;
  readonly universalQuestions = UNIVERSAL_QUESTIONS;

  get departmentQuestion(): Question | null {
    return this.selectedDepartment ? getDepartmentQuestion(this.selectedDepartment) : null;
  }

  get allQuestions(): Question[] {
    if (!this.departmentQuestion) return this.universalQuestions;
    return [...this.universalQuestions, this.departmentQuestion];
  }

  get isComplete(): boolean {
    if (!this.selectedDepartment) return false;
    return this.allQuestions.every(q => {
      const ans = this.answers[q.key];
      return ans && ans.length > 0;
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.surveyService.validate(this.token).subscribe({
      next: res => {
        this.tokenValid = res.valid;
        this.tokenError = res.reason ?? '';
        this.validating = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.tokenValid = false;
        this.tokenError = 'Could not reach the server. Please try again later.';
        this.validating = false;
        this.cdr.detectChanges();
      },
    });
  }

  onDepartmentChange(): void {
    delete this.answers['q10_dept'];
  }

  getSingleAnswer(key: string): string {
    return this.answers[key]?.[0] ?? '';
  }

  setSingleAnswer(key: string, value: string): void {
    this.answers[key] = [value];
  }

  isChecked(key: string, value: string): boolean {
    return this.answers[key]?.includes(value) ?? false;
  }

  toggleCheckbox(key: string, value: string): void {
    const current = this.answers[key] ?? [];
    if (current.includes(value)) {
      this.answers[key] = current.filter(v => v !== value);
    } else {
      this.answers[key] = [...current, value];
    }
  }

  submit(): void {
    if (!this.isComplete) return;
    this.submitting = true;
    this.submitError = '';

    this.surveyService.submit(this.token, {
      department: this.selectedDepartment,
      answers: this.answers,
    }).subscribe({
      next: () => {
        this.router.navigate(['/survey', this.token, 'thankyou']);
      },
      error: (err) => {
        this.submitError = err?.error?.error ?? 'Submission failed. Please try again.';
        this.submitting = false;
      },
    });
  }
}