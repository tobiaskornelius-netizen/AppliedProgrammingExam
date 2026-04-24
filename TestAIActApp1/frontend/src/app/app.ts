import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ViewModeService } from './services/view-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  viewMode = inject(ViewModeService);
  private router = inject(Router);

  get isAdmin(): boolean {
    return this.viewMode.isAdmin();
  }

  toggleView(): void {
    const next = this.viewMode.toggle();
    if (next === 'user') {
      this.router.navigate(['/user-home']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
