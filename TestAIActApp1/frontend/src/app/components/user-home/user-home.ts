import { Component, inject } from '@angular/core';
import { ViewModeService } from '../../services/view-mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [],
  templateUrl: './user-home.html',
})
export class UserHome {
  private viewMode = inject(ViewModeService);
  private router = inject(Router);

  switchToAdmin(): void {
    this.viewMode.setMode('admin');
    this.router.navigate(['/']);
  }
}
