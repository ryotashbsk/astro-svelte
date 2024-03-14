# Astro Svelte

## Overview

Package Manager：ppnpm  
Node.js：20.10.1  
Frontend：Astro / TypeScript / Svelte / SCSS

## Structure

```
/
├── dist/
├── src/
│   ├── utils/
│   ├── styles/
│   └── pages/
│   └── layouts/
│   └── images/
│   └── icons/
│   └── components/
└── package.json
```

## Commands

| Command                 | Action                                     |
| :---------------------- | :----------------------------------------- |
| `pnpm install`          | Install dependencies                       |
| `pnpm run dev`          | Start development server at localhost:4321 |
| `pnpm run build`        | Build to ./dist/ directory                 |
| `pnpm run preview`      | Preview the site                           |
| `pnpm run check:*`      | Run various compile error checks           |
| `pnpm run lint:*`       | Run various linters                        |
| `pnpm run astro ...`    | Astro CLI commands                         |
| `pnpm run astro --help` | Astro CLI help                             |
