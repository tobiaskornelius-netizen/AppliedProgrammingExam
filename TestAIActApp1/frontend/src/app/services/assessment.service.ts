import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssessmentRequest {
  toolId: number;
  q1: boolean;
  q2: boolean;
  q3: boolean;
}

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5129/api/assessments';

  submit(req: AssessmentRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl, req);
  }
}
