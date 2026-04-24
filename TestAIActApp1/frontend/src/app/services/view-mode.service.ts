import { Injectable } from '@angular/core';

export type ViewMode = 'admin' | 'user';

@Injectable({ providedIn: 'root' })
export class ViewModeService {
  private readonly KEY = 'viewMode';

  getMode(): ViewMode {
    return (localStorage.getItem(this.KEY) as ViewMode) ?? 'admin';
  }

  setMode(mode: ViewMode): void {
    localStorage.setItem(this.KEY, mode);
  }

  isAdmin(): boolean {
    return this.getMode() === 'admin';
  }

  toggle(): ViewMode {
    const next: ViewMode = this.isAdmin() ? 'user' : 'admin';
    this.setMode(next);
    return next;
  }
}
