# MyLights – Media Browser Dokumentation

## 1. Projekt-Übersicht

**MyLights** ist ein lokaler Media-Browser zur effizienten Verwaltung und Suche von Videodateien. Ursprünglich als Electron-App konzipiert, wurde das Projekt zu einer modernen Web-Anwendung auf Basis von **Next.js** migriert, um eine bessere Performance und modernere Web-Technologien zu nutzen.

## 2. System-Architektur

Das System basiert auf einer klassischen Client-Server-Struktur, optimiert für den lokalen Betrieb (Self-Hosting via XAMPP).

- **Frontend:**
  - **Framework:** Next.js 15+ (App Router)
  - **Sprache:** TypeScript
  - **Styling:** Tailwind CSS
  - **Features:** Dynamisches Video-Grid, Client-seitige Filterung, Responsive Design.

- **Backend:**
  - **Technologie:** PHP 8.x (Apache Server via XAMPP)
  - **Verzeichnis:** `/backend/api`
  - **Aufgabe:** Bereitstellung von REST-Endpunkten für die Medien-Suche und Authentifizierung.

- **Datenbank:**
  - **Typ:** MySQL (MariaDB via XAMPP)
  - **Standard-Port:** 3306 (alternativ 3307)
  - **Schema:** Speichert Metadaten zu Medien (Titel, Pfad, Kategorien, Likes).

## 3. Setup-Guide

### Datenbank-Import

1. Starten Sie das **XAMPP Control Panel** und aktivieren Sie das MySQL-Modul.
2. Öffnen Sie **phpMyAdmin** (meist `http://localhost/phpmyadmin`).
3. Erstellen Sie eine neue Datenbank namens `mylights`.
4. Importieren Sie die Datei `db/main.sql` (und optional `db/mock_data.sql` für Testdaten).

### Backend-Konfiguration

1. Kopieren Sie den Inhalt des Ordners `backend/` in das `htdocs`-Verzeichnis Ihrer XAMPP-Installation (z.B. `C:\xampp\htdocs\mylights-api\`).
2. Passen Sie die Datenbankverbindung in `backend/config/db.php` an, falls Sie einen anderen Port oder andere Zugangsdaten nutzen.
3. Starten Sie das **Apache**-Modul in XAMPP.

### Frontend-Start

1. Navigieren Sie im Terminal in den Ordner `frontend/`.
2. Installieren Sie die Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starten Sie den Entwicklungsserver:
   ```bash
   npm run dev
   ```
4. Die Anwendung ist nun unter `http://localhost:3000` erreichbar.

## 4. Kern-Funktionen

- **Video-Grid:** Übersichtliche Darstellung aller Medien mit Vorschaubildern.
- **Globale Suche:** Echtzeit-Suche über Titel und Kategorien via PHP-API.
- **Thumbnail-Generierung:** Automatische Extraktion von Vorschaubildern direkt aus dem Video-Stream (via Video-Frame-Capturing).
- **Kategorisierung:** Filtern von Inhalten nach Typen wie Filme, Serien oder personalisierte Playlists.

## 5. Entwickler-Hinweise

### Deployment-Prozess

Um Änderungen am Backend lokal zu testen, steht ein Deployment-Skript zur Verfügung:

- **Windows:** `deploy.ps1`
- **Linux/macOS:** `deploy.sh`

Dieses Skript kopiert die aktuellen API-Files automatisch in das lokale `htdocs`-Verzeichnis von XAMPP, um den Workflow zu beschleunigen.
