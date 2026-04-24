import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SurveyService, SurveyToken } from '../../services/survey.service';

@Component({
  selector: 'app-survey-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './survey-management.html',
})
export class SurveyManagement implements OnInit {
  private surveyService = inject(SurveyService);

  tokens: SurveyToken[] = [];
  showModal = false;
  newLabel = '';
  newExpiresAt = '';
  createdLink = '';
  loading = false;
  error: string | null = null;

  readonly baseUrl = window.location.origin;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.surveyService.getTokens().subscribe({
      next: data => (this.tokens = data),
      error: () => (this.error = 'Failed to load survey tokens.'),
    });
  }

  openModal(): void {
    this.showModal = true;
    this.newLabel = '';
    this.newExpiresAt = '';
    this.createdLink = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.createdLink = '';
  }

  generate(): void {
    if (!this.newLabel.trim()) return;
    this.loading = true;
    this.surveyService.createToken(
      this.newLabel.trim(),
      this.newExpiresAt || undefined
    ).subscribe({
      next: token => {
        this.createdLink = `${this.baseUrl}/survey/${token.token}`;
        this.tokens.unshift({ ...token, responseCount: 0 });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to generate token.';
        this.loading = false;
      },
    });
  }

  copy(link: string): void {
    navigator.clipboard.writeText(link).catch(() => {});
  }

  surveyLink(token: string): string {
    return `${this.baseUrl}/survey/${token}`;
  }

  deactivate(token: SurveyToken): void {
    if (!confirm(`Deactivate "${token.label}"? Existing responses will be kept but the link will stop working.`)) return;
    this.surveyService.deactivateToken(token.id).subscribe({
      next: () => (token.isActive = false),
      error: () => (this.error = 'Failed to deactivate token.'),
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }
}
