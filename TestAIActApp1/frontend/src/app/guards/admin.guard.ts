import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ViewModeService } from '../services/view-mode.service';

export const adminGuard: CanActivateFn = () => {
  const viewMode = inject(ViewModeService);
  const router = inject(Router);

  if (viewMode.isAdmin()) {
    return true;
  }

  // In user view, redirect away from admin routes
  router.navigate(['/user-home']);
  return false;
};
