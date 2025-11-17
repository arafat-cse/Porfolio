import { Injectable } from '@angular/core';

interface CrmUser {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class CrmAuthService {
  private readonly storageKey = 'crm-session';
  private readonly users: CrmUser[] = [
    { name: 'Admin User', email: 'admin@admin.com', password: 'admin@1234' },
    { name: 'Md Samaul islam', email: 'samaul@admin.com', password: 'admin@1234' },
    { name: 'Md Arafat Rahman', email: 'arafat@admin.com', password: 'admin@1234' }
  ];

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email.trim() && u.password === password);
    if (!user) {
      return false;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        name: user.name,
        email: user.email,
        signedInAt: new Date().toISOString()
      })
    );
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  get currentUser(): { name: string; email: string } | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as { name: string; email: string };
      return parsed;
    } catch {
      this.logout();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
