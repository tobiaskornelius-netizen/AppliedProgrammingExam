import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AITool {
  id?: number;
  name: string;
  vendor: string;
  type: string;
  riskLevel: string;
  personalData: boolean;
  companyId: number;
  departmentId?: number | null;
  transparencyStatus?: string;
  oversightOwner?: string | null;
  lastAuditDate?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ToolService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5129/api/tools';

  getAll(): Observable<AITool[]> {
    return this.http.get<AITool[]>(this.baseUrl);
  }

  create(tool: AITool): Observable<AITool> {
    return this.http.post<AITool>(this.baseUrl, tool);
  }

  update(id: number, tool: AITool): Observable<AITool> {
    return this.http.put<AITool>(`${this.baseUrl}/${id}`, tool);
  }

  logAudit(id: number): Observable<AITool> {
    return this.http.put<AITool>(`${this.baseUrl}/${id}/audit`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
