import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { ComplianceService, ComplianceReport, DashboardData } from '../../services/compliance.service';

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './report-view.html'
})
export class ReportView implements OnInit {
  private complianceService = inject(ComplianceService);
  private cdr = inject(ChangeDetectorRef);

  report: ComplianceReport | null = null;
  dashboard: DashboardData | null = null;
  error: string | null = null;
  showScoring = false;

  readonly riskLevels = ['Low', 'Limited', 'High', 'Unacceptable'];

  ngOnInit(): void {
    this.complianceService.getReport().subscribe({
      next: data => { this.report = data; this.cdr.detectChanges(); },
      error: err => { this.error = err.message ?? 'Failed to load report'; this.cdr.detectChanges(); }
    });

    this.complianceService.getDashboard().subscribe({
      next: data => { this.dashboard = data; this.cdr.detectChanges(); },
      error: () => {}
    });
  }

  get riskLabel(): string {
    if (!this.report) return '';
    if (this.report.riskScore <= 5) return 'Low Risk';
    if (this.report.riskScore <= 15) return 'Medium Risk';
    return 'High Risk';
  }

  get riskHeaderClass(): string {
    if (!this.report) return 'bg-gray-100 text-gray-700';
    if (this.report.riskScore <= 5)  return 'bg-green-500 text-white';
    if (this.report.riskScore <= 15) return 'bg-yellow-500 text-white';
    return 'bg-red-600 text-white';
  }

  riskLevelBadgeClass(level: string): string {
    switch (level) {
      case 'Unacceptable': return 'bg-red-100 text-red-800';
      case 'High':         return 'bg-orange-100 text-orange-800';
      case 'Limited':      return 'bg-yellow-100 text-yellow-800';
      default:             return 'bg-green-100 text-green-800';
    }
  }
}
