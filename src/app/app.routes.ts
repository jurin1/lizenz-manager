import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard'; // Stelle sicher, dass RoleGuard importiert ist
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// Beispiel für weitere eingeloggte Komponenten
// import { SettingsComponent } from './settings/settings.component';
// import { AdminPageComponent } from './admin-page/admin-page.component'; // Nur als Beispiel

export const routes: Routes = [
    // --- Öffentliche Routen (kein Login erforderlich) ---
    // Nutzen das AuthLayout (ohne Sidebar etc.)
    {
        path: '', // Basis-Pfad für öffentliche Routen
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'impressum', component: ImpressumComponent },
            { path: 'datenschutz', component: DatenschutzComponent },
            // Optional: Wenn jemand direkt '/' aufruft und NICHT eingeloggt ist,
            // leite ihn zum Login weiter. Der AuthGuard weiter unten verhindert,
            // dass eingeloggte User hier landen (er leitet zu /dashboard).
            // Wenn '/' eine öffentliche Landingpage sein soll, erstelle dafür eine Komponente.
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },

    // --- Geschützte Routen (Login erforderlich) ---
    // Nutzen das MainLayout (mit Sidebar, Toolbar etc.)
    // Wichtig: Dieser Block kommt NACH dem öffentlichen Block.
    {
        path: '', // Fängt Routen ab, die nicht im öffentlichen Block oben gematcht wurden
        component: MainLayoutComponent,
        canActivate: [AuthGuard], // Schützt ALLE Kind-Routen dieses Layouts
        children: [
            { path: 'dashboard', component: DashboardComponent },
            // { path: 'settings', component: SettingsComponent }, // Beispiel

            // Beispiel für Route mit Rollen-Schutz
            // {
            //     path: 'admin',
            //     component: AdminPageComponent, // Beispiel-Admin-Seite
            //     canActivate: [RoleGuard], // Zusätzlicher Guard für Rollen
            //     data: { roles: ['ADMIN', 'SUPER_ADMIN'] } // Benötigte Rollen hier definieren
            // },

            // Fallback innerhalb des geschützten Bereichs:
            // Wenn ein eingeloggter User eine ungültige Route im geschützten Bereich
            // aufruft (z.B. /xyz), leite ihn zum Dashboard.
            // ODER: Wenn jemand versucht, direkt auf den leeren Pfad zuzugreifen,
            // nachdem er eingeloggt wurde (was durch den AuthGuard hierher führt),
            // leite ihn zum Dashboard.
            // { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Diese Zeile war vorher HIER FALSCH platziert
            // Diese Zeile wird jetzt durch den AuthGuard indirekt abgedeckt, der bei Erfolg implizit
            // den Zugriff auf '' erlaubt, was dann von der nächsten Zeile zum dashboard weiterleitet.
            // Korrekter Platz für Redirect *innerhalb* des MainLayouts, falls direkt '' aufgerufen wird
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }


        ]
    },

    // --- Fallback für komplett unbekannte Routen ---
    // Wird nur erreicht, wenn keine der obigen Routen passt.
    // Leitet meist zum Login oder zu einer 404-Seite.
    // Oft wird das aber schon durch den AuthGuard abgedeckt, der zu /login leitet.
    { path: '**', redirectTo: 'login' } // Oder eine 404-Komponente anzeigen
];