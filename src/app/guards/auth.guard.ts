import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        console.log('AuthGuard: Checking access for URL:', state.url); // LOG 1
        const isAuthenticated = !!localStorage.getItem('authToken');
        console.log('AuthGuard: IsAuthenticated check result:', isAuthenticated); // LOG 2
        console.log('AuthGuard: Token value in localStorage:', localStorage.getItem('authToken')); // LOG 3

        if (isAuthenticated) {
            console.log('AuthGuard: Access GRANTED.'); // LOG 4
            return true; // User ist eingeloggt -> Zugriff erlauben
        } else {
            console.log('AuthGuard: Access DENIED. Redirecting to /login.'); // LOG 5
            // Optional: returnUrl ist gut, damit man nach dem Login zum ursprünglichen Ziel kommt
            return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        }
    }
}