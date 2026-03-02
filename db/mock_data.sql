USE media_host_db;

-- Vorbereitung: Bestehende Daten leeren (Optional, falls du sauber starten willst)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE media_category;
TRUNCATE TABLE media;
TRUNCATE TABLE category;
TRUNCATE TABLE media_type;
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================================
-- 1. MEDIENTYPEN (Passend zum PHP $type_map)
-- ==========================================================
INSERT INTO media_type (media_typeID, name, mime_type) VALUES
(1, 'image', 'image/jpeg'),
(2, 'video', 'video/mp4'),
(3, 'audio', 'audio/mpeg');

-- ==========================================================
-- 2. HIERARCHISCHE KATEGORIEN (Signaturen)
-- ==========================================================
-- Pfad A: Heilkunde -> Natur -> Kräuter -> Kopfschmerzen
INSERT INTO category (categoryID, name, parentID) VALUES
(1, 'Heilkunde',     NULL),
(2, 'Natur',         1),
(3, 'Kräuter',       2),
(4, 'Kopfschmerzen', 3);

-- Pfad B: Gesellschaft -> Beruf -> Berufswahl -> Informatik
INSERT INTO category (categoryID, name, parentID) VALUES
(5, 'Gesellschaft', NULL),
(6, 'Beruf',         5),
(7, 'Berufswahl',    6),
(8, 'Informatik',    7);

-- ==========================================================
-- 3. MEDIEN DATENSÄTZE
-- ==========================================================
-- Bilder
INSERT INTO media (mediaID, title, description, file_path, upload_date, media_typeID) VALUES
(1, 'Lavendel im Detail',   'Nahaufnahme von Lavendelblüten für beruhigende Anwendungen.',      'https://picsum.photos/id/237/800/600', NOW(), 1),
(2, 'Berglandschaft',       'Ein weiter Blick über die Alpen zur Entspannung.',                'https://picsum.photos/id/28/800/600',  NOW(), 1),
(3, 'Pfefferminz-Blätter',  'Frische Blätter direkt aus dem Heilkräutergarten.',               'https://picsum.photos/id/152/800/600', NOW(), 1);

-- Videos
INSERT INTO media (mediaID, title, description, file_path, upload_date, media_typeID) VALUES
(4, 'Big Buck Bunny',       'Klassischer Open-Source Animationsfilm für Testzwecke.',          'https://www.w3schools.com/html/mov_bbb.mp4', NOW(), 2),
(5, 'Bären in der Natur',   'Kurzes Video von Bären in ihrem natürlichen Lebensraum.',         'https://www.w3schools.com/html/movie.mp4',   NOW(), 2);

-- Audio Dateien
INSERT INTO media (mediaID, title, description, file_path, upload_date, media_typeID) VALUES
(6, 'Pferde-Galopp',        'Audioaufnahme eines galoppierenden Pferdes auf einer Koppel.',    'https://www.w3schools.com/html/horse.mp3', NOW(), 3),
(7, 'Ambient Waldrauschen', 'Beruhigende Hintergrundgeräusche aus einem Mischwald.',            'https://www.w3schools.com/html/horse.mp3', NOW(), 3);

-- ==========================================================
-- 4. ZUORDNUNG (Media to Categories) für Signatur-Logik
-- ==========================================================
-- Lavendel: Heilkunde > Natur > Kräuter
INSERT INTO media_category (mediaID, categoryID) VALUES (1, 1), (1, 2), (1, 3);

-- Berglandschaft: Heilkunde > Natur
INSERT INTO media_category (mediaID, categoryID) VALUES (2, 1), (2, 2);

-- Pfefferminze: Heilkunde > Natur > Kräuter > Kopfschmerzen
INSERT INTO media_category (mediaID, categoryID) VALUES (3, 1), (3, 2), (3, 3), (3, 4);

-- Big Buck Bunny: Gesellschaft > Beruf > Berufswahl > Informatik
INSERT INTO media_category (mediaID, categoryID) VALUES (4, 5), (4, 6), (4, 7), (4, 8);

-- Bären: Heilkunde > Natur
INSERT INTO media_category (mediaID, categoryID) VALUES (5, 1), (5, 2);

-- Pferde-Galopp: Heilkunde > Natur
INSERT INTO media_category (mediaID, categoryID) VALUES (6, 1), (6, 2);

-- Waldrauschen: Heilkunde > Natur > Kräuter
INSERT INTO media_category (mediaID, categoryID) VALUES (7, 1), (7, 2), (7, 3);