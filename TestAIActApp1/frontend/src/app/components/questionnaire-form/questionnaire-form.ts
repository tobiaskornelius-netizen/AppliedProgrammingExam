import { Component, OnInit, inject } from '@angular/core';
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

  token = '';
  validating = true;
  tokenValid = false;
  tokenError = '';

  // Form state
  selectedDepartment = '';
  answers: Record<string, string> = {};
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
    return this.allQuestions.every(q => !!this.answers[q.key]);
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.surveyService.validate(this.token).subscribe({
      next: res => {
        this.tokenValid = res.valid;
        this.tokenError = res.reason ?? '';
        this.validating = false;
      },
      error: () => {
        this.tokenValid = false;
        this.tokenError = 'Could not reach the server. Please try again later.';
        this.validating = false;
      },
    });
  }

  onDepartmentChange(): void {
    // Clear department-specific answer when department changes
    delete this.answers['q7_dept'];
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
      error: () => {
        this.submitError = 'Submission failed. Please try again.';
        this.submitting = false;
      },
    });
  }
}
