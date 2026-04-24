import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolService, AITool } from '../../services/tool.service';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './tool-list.html'
})
export class ToolList implements OnInit {
  private router = inject(Router);
  private toolService = inject(ToolService);
  private cdr = inject(ChangeDetectorRef);

  tools: AITool[] = [];
  error: string | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.toolService.getAll().subscribe({
      next: data => {
        this.tools = data;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = err.message ?? 'Failed to load tools';
        this.cdr.detectChanges();
      }
    });
  }

  // ── KPI Computed Properties ──────────────────────────────────────────────
  get highRiskCount(): number {
    return this.tools.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Unacceptable').length;
  }

  get pendingTransparencyCount(): number {
    return this.tools.filter(t => t.transparencyStatus === 'Pending').length;
  }

  get neverAuditedCount(): number {
    return this.tools.filter(t => !t.lastAuditDate).length;
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  addTool(): void {
    this.router.navigate(['/tools', 'add']);
  }

  editTool(toolId: number): void {
    this.router.navigate(['/tools', toolId, 'edit']);
  }

  deleteTool(toolId: number): void {
    if (!confirm('Delete this tool?')) return;
    this.toolService.delete(toolId).subscribe(() => this.load());
  }

  // ── Audit & Transparency ─────────────────────────────────────────────────
  logAudit(tool: AITool): void {
    this.toolService.logAudit(tool.id!).subscribe({
      next: (updated) => {
        const idx = this.tools.findIndex(t => t.id === tool.id);
        if (idx !== -1) this.tools[idx] = updated;
        this.cdr.detectChanges();
      },
      error: () => alert('Failed to log audit.')
    });
  }

  setTransparency(tool: AITool, value: string): void {
    const payload = { ...tool, transparencyStatus: value };
    this.toolService.update(tool.id!, payload).subscribe({
      next: (updated) => {
        const idx = this.tools.findIndex(t => t.id === tool.id);
        if (idx !== -1) this.tools[idx] = updated;
        this.cdr.detectChanges();
      },
      error: () => alert('Failed to update transparency status.')
    });
  }

  auditLabel(lastAuditDate: string | null | undefined): string {
    if (!lastAuditDate) return 'Never Audited';
    const days = Math.floor((Date.now() - new Date(lastAuditDate).getTime()) / 86400000);
    return `${days} Day${days === 1 ? '' : 's'} Ago`;
  }

  // ── Badge Classes (Tailwind) ─────────────────────────────────────────────
  riskBadgeClass(level: string): string {
    switch (level) {
      case 'Unacceptable': return 'bg-red-100 text-red-800';
      case 'High':         return 'bg-orange-100 text-orange-800';
      case 'Limited':      return 'bg-yellow-100 text-yellow-800';
      default:             return 'bg-green-100 text-green-800';
    }
  }

  transparencyBadgeClass(status: string | undefined): string {
    switch (status) {
      case 'Implemented': return 'bg-green-100 text-green-800';
      case 'Pending':     return 'bg-yellow-100 text-yellow-800';
      default:            return 'bg-gray-100 text-gray-600';
    }
  }
}
