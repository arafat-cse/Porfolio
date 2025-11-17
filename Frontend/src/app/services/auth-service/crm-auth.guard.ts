import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CrmAuthService } from './crm-auth.service';

export const crmAuthGuard: CanActivateFn = () => {
  const auth = inject(CrmAuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/crm']);
  return false;
};
