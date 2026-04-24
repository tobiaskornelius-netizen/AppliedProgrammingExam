import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToolService } from '../../services/tool.service';
import { ComplianceService, DashboardData } from '../../services/compliance.service';
import { SurveyService, SurveyResults } from '../../services/survey.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private toolService = inject(ToolService);
  private complianceService = inject(ComplianceService);
  private surveyService = inject(SurveyService);

  totalTools = 0;
  dashboard: DashboardData | null = null;
  surveyResults: SurveyResults | null = null;
  error: string | null = null;

  readonly riskLevels = ['Unacceptable', 'High', 'Limited', 'Low'];

  get highRiskCount(): number {
    if (!this.dashboard) return 0;
    return (this.dashboard.riskLevelCounts['High'] ?? 0) +
           (this.dashboard.riskLevelCounts['Unacceptable'] ?? 0);
  }

  get topDepartment(): string {
    if (!this.surveyResults || !this.surveyResults.byDepartment.length) return '—';
    return this.surveyResults.byDepartment[0].department;
  }

  get frequencyDistribution(): { label: string; count: number; pct: number }[] {
    const dist = this.surveyResults?.answerDistributions?.['q1_frequency'];
    if (!dist || !this.surveyResults?.totalResponses) return [];
    const total = this.surveyResults.totalResponses;
    const labels: Record<string, string> = {
      never: 'Never',
      monthly: 'Monthly',
      few_per_month: 'Few/month',
      weekly: 'Weekly',
      daily: 'Daily',
    };
    return Object.entries(dist).map(([key, count]) => ({
      label: labels[key] ?? key,
      count,
      pct: Math.round((count / total) * 100),
    }));
  }

  riskColor(level: string): string {
    const map: Record<string, string> = {
      Unacceptable: 'bg-red-600',
      High: 'bg-orange-500',
      Limited: 'bg-yellow-400',
      Low: 'bg-green-500',
    };
    return map[level] ?? 'bg-gray-400';
  }

  riskCount(level: string): number {
    return this.dashboard?.riskLevelCounts[level] ?? 0;
  }

  ngOnInit(): void {
    this.toolService.getAll().subscribe({
      next: tools => (this.totalTools = tools.length),
      error: () => (this.error = 'Failed to load tools.'),
    });

    this.complianceService.getDashboard().subscribe({
      next: data => (this.dashboard = data),
      error: () => {},
    });

    this.surveyService.getResults().subscribe({
      next: results => (this.surveyResults = results),
      error: () => {},
    });
  }
}
