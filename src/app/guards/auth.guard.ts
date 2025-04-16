import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const isAuthenticated = !!localStorage.getItem('authToken');
        if (!isAuthenticated) {
            this.router.navigate(['/']);
        }
        return isAuthenticated;
    }
}

export function provideGuards() {
    return [AuthGuard];
}