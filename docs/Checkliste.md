# Checkliste

## 1. Technische Umsetzung (Datenbank & Web)

- [x] **Mediendatenbank (MySQL):** Erstellung einer Datenbank, die in die Kategorien Foto, Video und Sound gegliedert ist.
- [x] **Strukturierung/Signatur:** Medien müssen mit aussagekräftigen Signaturen (z. B. Heilkunde → Natur Kräuter → Kopfschmerzen) versehen werden.
- [x] **Web-Interface:** Realisierung einer Webseite (Media-Host) mit einer effektiven Suchfunktion für die Medieninhalte.
- [ ] **Abfragen & Aggregatsfunktionen:** Die bestehenden Datenbankabfragen müssen um sinnvolle Aggregatsfunktionen erweitert werden (z. B. COUNT, SUM, AVG zur statistischen Auswertung der Medienbestände).
- [x] **Datentransfer:** Einrichtung des Datentransfers zwischen dem lokalen MySQL-Server und dem Webserver (Green.ch), sowohl intern/extern als auch offline via FTP.
- [ ] **Betriebssicherheit:** Implementierung eines Backups und Durchführung eines Performancetests.

## 2. Benutzerverwaltung & Rechte-Matrix (DCL)

Ein zentraler neuer Aspekt aus den Präsentationen ist die Absicherung des Zugangs durch eine Benutzerverwaltung.

- [x] **Individuelle Rechte:** Einrichtung spezifischer Berechtigungen für verschiedene Benutzer.
- [ ] **DCL-Befehle anwenden:**
- [ ] **GRANT:** Erteilen von Rechten (SELECT, INSERT, UPDATE) auf Datenbank- oder Tabellenebene.
- [ ] **REVOKE:** Widerrufen von Berechtigungen.
- [x] **Rollenkonzept:** Erstellung einer Rechte-Matrix, aus der hervorgeht, welcher Benutzer (z. B. Admin, Gast, registrierter User) welche Aktionen auf welchen Tabellen ausführen darf.

## 3. Dokumentation (Bericht & Präsentation)

Die Bewertung erfolgt zu gleichen Teilen (je 50%) über den Bericht und die Präsentation.

- [x] **Bericht (Dokumentation):**
- [ ] Maximal 10 Seiten Umfang.
- [ ] Inhaltlich sollten hier das Datenbankdesign, die angewandten SQL-Befehle (inkl. Joins und Aggregatsfunktionen) und das Sicherheitskonzept (Rechte-Matrix) beschrieben sein.
- [ ] **Präsentation:**
- [ ] Maximal 10 Seiten Umfang.
- [ ] Inklusive einer technischen Vorführung des Projekts.

## 4. SQL-Kompetenzen (für die Abfragen im Projekt)

Stelle sicher, dass folgende Elemente in deinen Projekt-Abfragen korrekt eingesetzt werden, da diese auch Teil der Zwischenprüfungen waren:

- [x] **DML-Grundbefehle:** SELECT, INSERT, UPDATE, DELETE.
- [x] **Verknüpfungen:** Korrekte Anwendung von INNER JOIN und LEFT OUTER JOIN zur Verbindung von Tabellen.
- [ ] **Gruppierung:** Einsatz von Aggregatsfunktionen zur Datenanalyse.
