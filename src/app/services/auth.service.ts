import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    login(username: string, password: string): boolean {
        // Simulierte Authentifizierung
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('authToken', 'dummy-token');
            localStorage.setItem('userRoles', JSON.stringify(['Admin', 'SuperUser']));
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRoles');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    }
}

export function provideAuth() {
    return {
        provide: AuthService,
        useClass: AuthService
    };
}