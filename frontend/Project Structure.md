# Project Structure

```
frontend/
├── app/
│   ├── (dashboard)/
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── history/
│   │   │   └── page.tsx
│   │   ├── liked/
│   │   │   └── page.tsx
│   │   ├── playlists/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── media/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── UI/
│   │   └── MediaCard.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── constants/
│   ├── filters.ts
│   └── mockData.ts
├── lib/
│   ├── api-client.ts
│   └── thumbnail.ts
├── public/
│   └── logo.svg
├── types/
│   └── media.ts
├── README.md
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```