import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
        const requiredRoles = route.data['roles'] as string[];

        const hasAccess = requiredRoles.some(role => userRoles.includes(role));
        if (!hasAccess) {
            this.router.navigate(['/dashboard']);
        }
        return hasAccess;
    }
}