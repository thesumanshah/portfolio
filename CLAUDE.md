# CLAUDE.md

## Project Overview

Personal portfolio website for Suman Shah — an Infrastructure Support Engineer. Built with Gatsby 3 and React 18, styled with styled-components, and deployed on Netlify. Originally forked from Brittany Chiang's v4 portfolio.

**Live site:** https://sumanshah.com

## Tech Stack

- **Framework:** Gatsby 3.4.1 (static site generator with GraphQL data layer)
- **UI:** React 18.3.1
- **Styling:** styled-components 5.3.0 with CSS custom properties
- **Animation:** anime.js, ScrollReveal, React Transition Group
- **Content:** Markdown with gatsby-transformer-remark (frontmatter-driven)
- **Code highlighting:** PrismJS via gatsby-remark-prismjs
- **Node version:** 14.16.0 (see `.nvmrc`)
- **Package manager:** Yarn (yarn.lock present)

## Commands

```bash
yarn install          # Install dependencies
yarn develop          # Start dev server (localhost:8000)
yarn build            # Production build to /public
yarn serve            # Serve production build locally
yarn clean            # Clear Gatsby cache (.cache and public dirs)
yarn format           # Run Prettier on all JS/JSX/JSON/MD files
```

## Project Structure

```
/
├── content/              # Markdown content (drives data via GraphQL)
│   ├── featured/         # Featured project entries (with images)
│   ├── jobs/             # Work experience entries
│   ├── posts/            # Blog posts (Pensieve section)
│   └── projects/         # Project showcase entries
├── src/
│   ├── components/       # React components
│   │   ├── icons/        # SVG icon components + Icon.js switcher
│   │   └── sections/     # Page section components (Hero, About, Jobs, etc.)
│   ├── fonts/            # Custom web fonts (Calibre, Geist Pixel)
│   ├── hooks/            # Custom React hooks
│   ├── images/           # Image assets and favicons
│   ├── pages/            # Gatsby file-based routing pages
│   │   └── pensieve/     # Blog section pages
│   ├── styles/           # Styled-components theme, mixins, globals
│   ├── templates/        # Gatsby templates for dynamic pages (post, tag)
│   ├── utils/            # Utility functions
│   └── config.js         # Site configuration (contact info, nav links, colors)
├── static/               # Static assets (PDFs, OG images, slides)
├── gatsby-config.js      # Gatsby plugins and site metadata
├── gatsby-node.js        # Dynamic page creation and webpack aliases
└── gatsby-browser.js     # Browser-side Gatsby APIs
```

## Webpack Aliases

Configured in `gatsby-node.js` — use these for imports:

| Alias | Path |
|-------|------|
| `@components` | `src/components` |
| `@config` | `src/config` |
| `@fonts` | `src/fonts` |
| `@hooks` | `src/hooks` |
| `@images` | `src/images` |
| `@pages` | `src/pages` |
| `@styles` | `src/styles` |
| `@utils` | `src/utils` |

## Routing

**Static pages (file-based):**
- `/` — Homepage (Hero, About, Jobs, Featured, Contact sections)
- `/archive` — Projects archive table
- `/404` — Custom 404 page
- `/pensieve` — Blog index
- `/pensieve/tags` — All tags page

**Dynamic pages (created in gatsby-node.js):**
- `/pensieve/[slug]` — Individual blog posts from `content/posts/`
- `/pensieve/tags/[tag]` — Posts filtered by tag (kebab-case URLs)

**Hash navigation:** `/#about`, `/#jobs`, `/#projects`, `/#contact` — scroll-to-section on homepage

## Content Authoring

Content lives in `/content/` as Markdown files with YAML frontmatter. Each content type has its own directory and frontmatter schema:

**Jobs** (`content/jobs/`):
```yaml
date: '2025-03-01'
title: 'Position Title'
company: 'Company Name'
location: 'City, State'
range: 'Month Year - Present'
url: 'https://company.com'
```

**Featured projects** (`content/featured/`):
```yaml
date: '2025-01-01'
title: 'Project Name'
cover: './image.png'
tech:
  - React
  - Node.js
github: 'https://github.com/...'
external: 'https://live-url.com'
```

**Blog posts** (`content/posts/`):
```yaml
title: 'Post Title'
description: 'Short description'
date: '2025-01-01'
draft: false
slug: '/pensieve/post-slug'
tags:
  - Tag1
  - Tag2
```

## Styling Conventions

- **CSS-in-JS** via styled-components — no CSS modules or plain CSS files
- **CSS custom properties** defined in `GlobalStyle.js` for colors, font sizes, transitions
- **Theme object** in `src/styles/theme.js` provides breakpoints and mixins via `ThemeProvider`
- **Design tokens:**
  - Primary background: Navy (`#0a192f`), Dark Navy (`#020c1b`)
  - Accent color: Green (`#64ffda`)
  - Text: Slate scale (lightest to dark)
- **Breakpoints** (max-width): 330px, 400px, 480px, 600px, 768px, 900px, 1080px, 1200px, 1400px
- **Fonts:** Calibre (sans-serif body), Geist Pixel Square (monospace/code, from Vercel's geist package)
- **Geist Pixel variants:** Square (default mono), Grid, Circle, Triangle, Line — available via `--font-pixel-*` CSS variables
- Use `${({ theme }) => theme.bp.tabletL}` pattern for media queries in styled-components
- Use `${({ theme }) => theme.mixins.flexCenter}` for common layout patterns

## Component Patterns

- Components use React hooks (`useState`, `useEffect`, `useRef`) — no class components
- Custom hooks in `src/hooks/`: `useScrollDirection`, `useOnClickOutside`, `usePrefersReducedMotion`
- Components are barrel-exported from `src/components/index.js`
- Icons use a centralized `Icon.js` switch component — pass a `name` prop to select the icon
- Section components handle their own GraphQL data queries with `useStaticQuery`
- SEO handled by `Head` component using `react-helmet`
- Animations respect `prefers-reduced-motion` via the `usePrefersReducedMotion` hook

## Linting and Formatting

- **ESLint:** `@upstatement/eslint-config/react` (extends from `.eslintrc`)
- **Prettier:** `@upstatement/prettier-config` (from `prettier.config.js`)
- **Pre-commit hook:** Husky runs `lint-staged` which applies Prettier and ESLint fixes to staged files
- **Editor config:** 2-space indentation, UTF-8, LF line endings, trim trailing whitespace

## Key Conventions

- No test suite — this is a content portfolio site, not an application with tests
- No global state management — local state via hooks, build-time data via GraphQL
- Configuration centralized in `src/config.js` (email, social links, nav, colors, ScrollReveal config)
- SSR safety: scrollreveal, animejs, and miniraf are null-loaded during server-side builds (see `gatsby-node.js` webpack config)
- All external links open in new tabs with `rel="nofollow noopener noreferrer"`
- Image optimization handled by `gatsby-plugin-sharp` and `gatsby-remark-images`

## Deployment

- **Platform:** Netlify (via `gatsby-plugin-netlify`)
- **Build command:** `gatsby build`
- **Publish directory:** `public/`
- **Features:** PWA manifest, service worker (offline support), sitemap, robots.txt
- **Analytics:** Google Analytics (UA-45666519-2)
