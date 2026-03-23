# Project Structure

```
m106-media-project/
├── backend/
│   ├── api/
│   │   ├── auth.php
│   │   ├── db_test.php
│   │   ├── search.php
│   │   └── stats.php
│   └── config/
│       └── db.php
├── db/
│   ├── backup.sql
│   ├── main.sql
│   └── mock_data.sql
├── docs/
│   ├── Checkliste.md
│   └── index.md
├── frontend/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   ├── history/
│   │   │   │   └── page.tsx
│   │   │   ├── liked/
│   │   │   │   └── page.tsx
│   │   │   ├── playlists/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── media/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── UI/
│   │   │   └── MediaCard.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── constants/
│   │   ├── filters.ts
│   │   └── mockData.ts
│   ├── lib/
│   │   ├── api-client.ts
│   │   └── thumbnail.ts
│   ├── public/
│   │   └── logo.svg
│   ├── types/
│   │   └── media.ts
│   ├── Project Structure.md
│   ├── README.md
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── Aufgabe.pdf
├── Issues.md
├── LICENSE
├── Project Structure.md
├── deploy.ps1
└── deploy.sh
```
