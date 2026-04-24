import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Company {
  id?: number;
  name: string;
  industry: string;
  toolCount?: number;
}

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5129/api/companies';

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }

  update(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}`, company);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
