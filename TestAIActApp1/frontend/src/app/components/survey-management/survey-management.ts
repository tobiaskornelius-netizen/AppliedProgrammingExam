import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SurveyService, SurveyToken, SurveyResults } from '../../services/survey.service';
import { UNIVERSAL_QUESTIONS, DEPARTMENT_QUESTIONS } from '../../config/questionnaire.config';

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

  results: SurveyResults | null = null;
  showResults = false;
  resultsLoading = false;
  resultsLoaded = false;

  readonly baseUrl = window.location.origin;

  readonly questionLabels: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    for (const q of UNIVERSAL_QUESTIONS) {
      map[q.key] = q.text;
      for (const o of q.options) map[`${q.key}__${o.value}`] = o.label;
    }
    for (const dept of Object.values(DEPARTMENT_QUESTIONS)) {
      map[dept.key] = dept.text;
      for (const o of dept.options) map[`${dept.key}__${o.value}`] = o.label;
    }
    return map;
  })();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.surveyService.getTokens().subscribe({
      next: data => (this.tokens = data),
      error: () => (this.error = 'Failed to load survey tokens.'),
    });
  }

  toggleResults(): void {
    this.showResults = !this.showResults;
    if (this.showResults && !this.resultsLoaded) {
      this.resultsLoading = true;
      this.surveyService.getResults().subscribe({
        next: data => {
          this.results = data;
          this.resultsLoading = false;
          this.resultsLoaded = true;
        },
        error: () => {
          this.error = 'Failed to load survey results.';
          this.resultsLoading = false;
        },
      });
    }
  }

  questionKeys(): string[] {
    return this.results ? Object.keys(this.results.answerDistributions) : [];
  }

  answerEntries(key: string): { answer: string; count: number }[] {
    if (!this.results) return [];
    const dist = this.results.answerDistributions[key];
    return Object.entries(dist)
      .map(([answer, count]) => ({ answer, count }))
      .sort((a, b) => b.count - a.count);
  }

  questionLabel(key: string): string {
    return this.questionLabels[key] ?? key;
  }

  answerLabel(questionKey: string, answerValue: string): string {
    return this.questionLabels[`${questionKey}__${answerValue}`] ?? answerValue;
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
    this.loading = false;
  }

  generate(): void {
    if (!this.newLabel.trim() || this.loading) return;
    this.loading = true;
    this.surveyService.createToken(this.newLabel.trim(), this.newExpiresAt || undefined).subscribe({
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
    navigator.clipboard.writeText(link).catch(() => { });
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