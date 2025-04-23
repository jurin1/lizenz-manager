import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { provideAuth } from './services/auth.service'; // <- DIESE ZEILE ENTFERNEN
// import { provideGuards } from './guards/auth.guard'; // <- DIESE ZEILE ENTFERNEN

// Importiere die Services/Guards nur, falls dein Linter/Build-Tool es benötigt,
// damit sie "bekannt" sind. Normalerweise nicht notwendig bei providedIn:'root'.
// import { AuthService } from './services/auth.service';
// import { AuthGuard } from './guards/auth.guard';
// import { RoleGuard } from './guards/role.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Stellt Routen bereit; Angular findet die Guards via DI, da sie providedIn:'root' sind.
    // provideAuth(), // <- Entfernt
    // provideGuards() // <- Entfernt
  ]
};