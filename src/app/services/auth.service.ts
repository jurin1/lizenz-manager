import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) // Dies reicht für die Bereitstellung aus
export class AuthService {
    login(username: string, password: string): boolean {
        // Simulierte Authentifizierung
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('authToken', 'dummy-token');
            localStorage.setItem('userRoles', JSON.stringify(['Admin', 'SuperUser'])); // Achte auf Gross/Kleinschreibung (vs. RoleGuard)
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRoles');
    }

    // Es ist üblich, die Methode isLoggedIn statt isAuthenticated zu nennen, passend zum Guard
    // Aber isAuthenticated funktioniert natürlich auch. Wähle einen Namen und sei konsistent.
    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    }

    // Optional: Methode zum Abrufen der Rollen hinzufügen, falls benötigt
    getUserRoles(): string[] {
        const roles = localStorage.getItem('userRoles');
        return roles ? JSON.parse(roles) : [];
    }
}

// Die Funktion provideAuth() wird komplett entfernt
// export function provideAuth() { ... } // <-- LÖSCHEN