import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SurveyToken {
  id: number;
  token: string;
  label: string;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
  responseCount: number;
}

export interface SurveyResults {
  totalResponses: number;
  byDepartment: { department: string; count: number }[];
  answerDistributions: Record<string, Record<string, number>>;
}

export interface SurveySubmitPayload {
  department: string;
  answers: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private http = inject(HttpClient);
  private base = 'http://localhost:5129/api/surveys';

  // Admin
  createToken(label: string, expiresAt?: string): Observable<SurveyToken> {
    return this.http.post<SurveyToken>(`${this.base}/tokens`, { label, expiresAt: expiresAt ?? null });
  }

  getTokens(): Observable<SurveyToken[]> {
    return this.http.get<SurveyToken[]>(`${this.base}/tokens`);
  }

  deactivateToken(id: number): Observable<SurveyToken> {
    return this.http.delete<SurveyToken>(`${this.base}/tokens/${id}`);
  }

  getResults(): Observable<SurveyResults> {
    return this.http.get<SurveyResults>(`${this.base}/results`);
  }

  // Public
  validate(token: string): Observable<{ valid: boolean; reason?: string }> {
    return this.http.get<{ valid: boolean; reason?: string }>(`${this.base}/validate/${token}`);
  }

  submit(token: string, payload: SurveySubmitPayload): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.base}/submit/${token}`, payload);
  }
}
