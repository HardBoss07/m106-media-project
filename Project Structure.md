# Project Structure

```
m106-media-project/
├── backend/
│   ├── api/
│   │   ├── auth.php
│   │   └── search.php
│   └── config/
│       └── db.php
├── db/
│   ├── main.sql
│   └── mock_data.sql
├── docs/
│   └── index.md
├── electron-app/
│   └── MyLights/
│       ├── renderer/
│       │   ├── app.js
│       │   ├── index.html
│       │   ├── logo.svg
│       │   └── style.css
│       ├── install.bat
│       ├── logo.ico
│       ├── logo.svg
│       ├── main.js
│       ├── package-lock.json
│       ├── package.json
│       └── preload.js
├── frontend/
│   ├── app/
│   │   ├── media/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── UI/
│   │   │   ├── MediaCard.tsx
│   │   │   ├── MediaPlayerControls.tsx
│   │   │   └── SearchBar.tsx
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── constants/
│   │   ├── filters.ts
│   │   └── mockData.ts
│   ├── lib/
│   │   └── api-client.ts
│   ├── public/
│   │   └── logo.svg
│   ├── types/
│   │   └── media.ts
│   ├── README.md
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── Aufgabe.pdf
├── LICENSE
├── Project Structure.md
├── deploy.ps1
└── deploy.sh
```