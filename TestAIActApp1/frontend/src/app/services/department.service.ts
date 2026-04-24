import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id?: number;
  name: string;
  companyId?: number;
}

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private http = inject(HttpClient);
  private base = 'http://localhost:5129/api/departments';

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.base);
  }

  create(dept: Department): Observable<Department> {
    return this.http.post<Department>(this.base, dept);
  }

  update(id: number, dept: Department): Observable<Department> {
    return this.http.put<Department>(`${this.base}/${id}`, dept);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
