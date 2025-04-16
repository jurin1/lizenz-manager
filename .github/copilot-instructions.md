# Projektplan – Lizenzverwaltungs-Anwendung

## Überblick

Eine Webanwendung zur Verwaltung von Softwarelizenzen für Benutzergruppen. Die Anwendung unterstützt:

- Gruppen- und Benutzerverwaltung
- Produkt- und Lizenzverwaltung
- Rechtebasierte Benutzerrollen
- Import/Export via CSV
- Sichere Speicherung der Lizenzdaten (optional verschlüsselt)
- Responsive UI mit moderner Benutzeroberfläche

---

## Technologie-Stack

- **Frontend:** Angular 19
  - CSS für Styling
  - Moderne UI Libraries (z.B. [Angular Material](https://material.angular.io/), [Tailwind](https://tailwindcss.com/), [ngx-datatable](https://swimlane.github.io/ngx-datatable/))
- **Backend:** Pocketbase (Go-basierte Backendlösung mit Auth, DB, API)
- **Verschlüsselung:** AES-GCM, WebCrypto API (im Browser)
- **Speicher:** IndexedDB / LocalStorage für Passphrase
- **CSV Handling:** `papaparse` oder `ngx-csv`

---

## Rollen & Berechtigungen

| Rolle      | Gruppenverwaltung | Produktverwaltung | Lizenzverwaltung  | CSV-Import/Export | Verschlüsselung    |
| ---------- | ----------------- | ----------------- | ----------------- | ----------------- | ------------------ |
| Admin      | Global            | Global            | Global            | Global            | Ja                 |
| Super User | Nur eigene Gruppe | Nur eigene Gruppe | Nur eigene Gruppe | Eigene Gruppe     | Ja                 |
| User       | Keine             | Nur eigene        | Nur eigene        | Nur eigene        | Ja (eingeschränkt) |

---

## Entitäten und Beziehungen

### User

- Vorname, Nachname, E-Mail, Profilbild, Kontaktinformationen
- Gruppe (1:n)
- Lizenzzuweisung (m:n)

### Gruppe

- Name, Firmenname, Kontaktperson, Adresse, individuelle Felder
- Profilbild
- Produkte, Lizenzen
- Verschlüsselung: Aktiv / Inaktiv
- Masterkey (optional, verschlüsselt mit Passphrase)

### Produkt

- Produktname, Beschreibung, Produktbild
- Produkt-ID (wird für CSV benötigt)

### Lizenz (Key)

- Key (verschlüsselt / unverschlüsselt)
- Produkt (n:1)
- Benutzer (optional)
- Gruppe (1:n)
- Typ (z.B. PC, Mobile)

---

## Hauptfeatures

### Authentifizierung & Guards

- JWT-basierte Authentifizierung via Pocketbase
- Route Guards:
  - `AuthGuard`: Leitet unautorisierte Benutzer zur Login-Seite um

### Gruppen-Management

- Gruppen erstellen (Admin)
- Gruppen anzeigen & bearbeiten (Admin / Super User)
- Kontaktdaten & Profilbild hochladen
- Dynamische Felder hinzufügen

### Benutzer-Management

- Benutzer erstellen (Admin / Super User)
- Kontaktdaten & Profilbild
- Profil bearbeiten
- Benutzer zu Gruppen zuweisen

### Produkt-Management

- Produkt anlegen (Admin, Super User für eigene Gruppe)
- Produkt-ID ist Pflicht
- Produktbild hochladen

### Lizenz-Management

- Keys erstellen, ansehen, einem Benutzer zuweisen
- Typ (z.B. PC/Mobile) hinzufügen
- Export / Import per CSV
- Anzeige aller Keys je Gruppe, Benutzer oder Produkt

### CSV-Upload/Download

- Import: Produkte, Keys, Benutzer
- Export: Lizenzen einer Gruppe / Benutzers
- Validierung & Fehlerhandling bei CSV

### Verschlüsselungskonzept

- Optional pro Gruppe aktivierbar
- Schlüsselgenerierung beim Aktivieren
- Masterkey verschlüsselt mit Passphrase
- Speicherung im Client (SessionStorage / IndexedDB)
- Entschlüsselung via WebCrypto beim Laden der Daten
- Admin sieht Key einmalig bei Generierung
- Passphrase kann zur Laufzeit eingegeben und gespeichert werden

---

## UI & Design

- Responsive Design mit Angular + SCSS
- Nutzung von modernen UI-Komponenten (Material, Tailwind o.Ä.)
- Dark Mode Support (optional)
- Dashboard für Admin / Super User / User mit jeweils angepasstem Content
- Tabellarische und Karten-Darstellungen
- Drag & Drop Uploads für CSV und Bilder
- Snackbar & Dialog-Feedback

---

## Routenübersicht

```text
/                 → Landingpage/Login
/dashboard        → Übersicht je nach Rolle
/gruppen          → Gruppenverwaltung (Admin)
/gruppe/:id       → Detailseite der Gruppe
/benutzer         → Benutzerübersicht
/produkte         → Produktübersicht
/produkt/:id      → Produktdetails
/lizenzen         → Lizenzübersicht
/upload           → CSV Upload
/export           → CSV Export
/impressum        → Impressum
/datenschutz      → Datenschutzerklärung
```
