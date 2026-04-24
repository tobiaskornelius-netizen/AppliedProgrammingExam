import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ComplianceReport {
  companyId: number;
  companyName: string;
  riskScore: number;
  totalTools: number;
  highRiskCount: number;
  personalDataCount: number;
}

export interface DashboardData {
  totalTools: number;
  riskLevelCounts: { [key: string]: number };
  pendingTransparencyTools: string[];
  auditNeglectTools: string[];
}

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5129/api/compliance';

  getReport(): Observable<ComplianceReport> {
    return this.http.get<ComplianceReport>(`${this.baseUrl}/report`);
  }

  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.baseUrl}/dashboard`);
  }
}
