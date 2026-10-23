# Payload Site Kit

A reusable, fully editable website template built with **Payload CMS 3**, **Next.js (App Router)** and **MongoDB**.

Editors create pages, sections, blog posts, forms, themes, headers and footers from the admin panel, with no code changes. Developers build the components once and reuse them for every client.

---

## What type of project is this?

This is a **website template with a built-in CMS**, similar in purpose to WordPress but built with code:

- **Payload CMS** runs inside the Next.js app and provides the admin panel at `/admin`.
- **Next.js** renders the public website (fast, cached pages, SEO-ready).
- **MongoDB** stores pages, posts, forms and settings.
- Everything on the site (text, images, sections, menus, colors, forms) is managed from the admin panel. Nothing client-specific is hard-coded.

It can be used in two ways:

1. **Full website:** deploy the whole project as a client's website.
2. **Headless CMS (API only):** run it as a separate CMS and let another website read the content through the API (for example to add a blog to an existing site).

---

## Features

**Pages and sections**
- Create any page or route from the admin (Home, About, Services, Contact, nested pages)
- Build each page from blocks: Hero, Cards, Image + Text, FAQ, Testimonials, Pricing, Gallery, Content, Forms, Blog Posts
- Page banner (hero) with title, description, buttons, left/center/right alignment, image fit and overlay
- Section controls: height (fit, half, full screen), width, spacing, background image, animation
- Cards with optional image, link and custom widths

**Design and themes**
- Multiple ready-made color themes, editable from the admin
- Theme per site, per page and per section
- Automatic readable text (contrast checks), so text stays visible on any background
- Fonts, corner radius, button style and shadows set by theme

**Navigation**
- Editable header: logo, links, dropdown menus, call-to-action button, layout variants
- Editable footer: link columns, address, social links, legal links, copyright
- Smooth navigation with no full page reloads

**Blog**
- Blog list, blog detail page, categories, authors, read time, pagination
- Blog Posts block for any page

**Forms**
- Contact form, call-to-action form and popup (modal) form
- Editor chooses the fields, validation rules and error messages
- Submissions saved in the admin, with spam protection

**SEO and performance**
- Meta title, description, Open Graph image, canonical URL per page
- Cached pages with automatic refresh when an editor publishes
- Optimized images (WebP/AVIF, responsive sizes)

**Security**
- Admin and editor roles
- Published content only for the public, drafts for logged-in users
- Rate-limited login, restricted uploads, validated form input

---

## Tech stack

| Part | Tool |
|---|---|
| CMS and admin | Payload CMS 3.x |
| Frontend | Next.js (App Router), React, TypeScript |
| Database | MongoDB (Mongoose adapter) |
| Styling | Tailwind CSS with CSS variables for themes |
| Package manager | npm |
| Tests | Vitest (unit), Playwright (end-to-end) |

---

## Project status

Tick each phase when it is finished.

| Phase | Description | Status |
|---|---|---|
| 1 | Project setup and MongoDB | [x] |
| 2 | App Router and catch-all page route | [x] |
| 3 | Site settings and theme | [x] |
| 4 | Navigation, links and SEO | [ X] |
| 5 | Content blocks (Image + Text, FAQ, Cards, Hero, ...) | [X ] |
| 5B | Header and footer builder | [ ] |
| 5C to 5F | Cards, hero, page banner, section height | [X] |
| 5G, 5H | Section themes and multiple themes | [X] |
| 6 | Blog | [X] |
| 7 | Forms and popup | [X] |
| 8 | Roles and security | [X] |
| 9 | Testing and deployment | [X] |
| 10 | Reference ui, user can selected reference ui | [] |

---

## Requirements

- **Node.js** current LTS version (check with `node -v`)
- **npm** (check with `npm -v`)
- **MongoDB**: either a free [MongoDB Atlas](https://www.mongodb.com/atlas) database or MongoDB installed locally
- **Git**

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd <repo-folder>
npm install
```

If `npm install` shows peer dependency errors, run:

```bash
npm install --legacy-peer-deps
```

> Use a folder name without spaces. Spaces in the project path can cause tool errors.

### 2. Create the environment file

Copy the example file:

```bash
cp .env.example .env
```

On Windows PowerShell, use `copy .env.example .env`.

Open `.env` and set:

| Variable | Description |
|---|---|
| `DATABASE_URI` | MongoDB connection string, for example `mongodb://127.0.0.1:27017/payload-website` or your Atlas URL |
| `PAYLOAD_SECRET` | A long random secret. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_SERVER_URL` | The public site URL, `http://localhost:3000` for local development |

Other variables (storage, email, spam protection, allowed origins) are listed in `.env.example`.

Never commit `.env`. Only `.env.example` with placeholder values goes into Git.

### 3. Start the development server

```bash
npm run dev
```

- Website: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin>

### 4. Create the first admin user

Open <http://localhost:3000/admin> and create the first user with an email and password. The first user becomes the admin.

### 5. (Optional) Add demo content

On the admin dashboard, use **Seed your database** to add sample pages and posts. Remove the demo content before going live.

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run generate:types` | Regenerate TypeScript types after changing collections or blocks |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |

Check `package.json` for the full list, including the test commands.

> After you change any collection, global or block config, run `npm run generate:types`. After you add a custom admin component, run `npm run generate:importmap`.

---

## Project structure

```
src/
  app/
    (payload)/          Admin panel and API routes (do not edit by hand)
    (frontend)/         The public website
      [[...slug]]/      One optional catch-all route for every CMS page, including "/"
  collections/          Pages, Posts, Categories, Media, Users, ...
  globals/              Header, Footer, SiteSettings, BlogSettings
  blocks/               Block config + React component for each section type
  components/           Shared components (links, cards, buttons, forms, modal)
  fields/               Reusable field groups (section style, section header, card, action)
  access/               Access control helpers for roles
  lib/                  Helpers (theme, contrast, validation)
  payload.config.ts     Main Payload configuration
```

---

## How editors use it

1. Log in at `/admin`.
2. **Pages** > **Create new**: enter a title and a slug (for example `services`).
3. In **Layout**, click **Add Block** and choose a section (Hero, Cards, Image + Text, FAQ, ...).
4. Fill in the title, description, image and buttons. Choose alignment, height and theme in the section's Style group.
5. Fill in the **SEO** tab.
6. Click **Save draft** to keep working, or **Publish** to make the page live. The route works immediately, with no code change.

Other admin areas:

- **Header / Footer:** logo, menu, dropdowns, link columns, social links
- **Site settings:** site name, logo, themes, fonts
- **Posts / Categories:** blog
- **Forms / Form submissions:** build forms and read the entries
- **Media:** images and files

---

## Starting a new client project

1. Copy this repo (or use it as a GitHub template).
2. Create a **new MongoDB database** for the client.
3. Set the `.env` values (database, secret, site URL, storage, email).
4. Deploy and create the first admin user.
5. In **Site settings**, choose the theme, logo and fonts.
6. Fill in **Header** and **Footer**.
7. Create the pages (Home, About, Services, Contact) from blocks.
8. Create the forms and connect them to buttons.
9. Fill in the SEO fields and check the sitemap.
10. Connect the custom domain and test on a real phone.

Keep client-specific code out of the template. If a client needs a new component that other clients could use, add it to the template.

---

## Adding a new block

1. Create the block config (the editable fields) in `src/blocks/<Name>/config.ts`.
2. Create the React component in `src/blocks/<Name>/Component.tsx`. Use theme tokens and the shared section wrapper.
3. Register the block in the Pages collection layout and in `RenderBlocks.tsx`.
4. Run `npm run generate:types` and `npm run generate:importmap`.
5. Restart the dev server. The block appears in the admin's **Add Block** list.

Rules for components:

- Use theme tokens (for example `bg-primary`), never hard-coded colors.
- Map select values to full Tailwind class names. Do not build class names dynamically.
- Keep components as Server Components. Use `'use client'` only for interactive parts.
- Make every new field optional so existing pages keep working.

---

## Using it as a headless CMS (API only)

To add a blog or content to another website, run this project as a separate CMS and read the content through the REST API:

```
GET /api/posts?limit=10&page=1&sort=-publishedAt&depth=1
GET /api/posts?where[slug][equals]=my-post&limit=1&depth=2
GET /api/categories?limit=100
```

- Set `ALLOWED_ORIGINS` to the exact domains that may call the API. Never use `*`.
- Anonymous requests receive only published content. Author emails are never returned.
- Call the API from the server side of the other website and cache the response.

---

## Deployment

- **Vercel, VPS, Docker or any Node.js host** works. A `Dockerfile` and `docker-compose.yml` are included in the repo.
- Shared PHP hosting (cPanel) cannot run this project.
- Use cloud storage (S3, Cloudflare R2 or Vercel Blob) for uploaded media.
- Use MongoDB Atlas or a managed MongoDB, in a region close to the server.
- Set all production environment variables on the host, with a new `PAYLOAD_SECRET`.
- Back up the database and the media storage.
- Disable or remove the demo seed route in production.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `ECONNREFUSED` or `MongooseServerSelectionError` | MongoDB is not running or the `DATABASE_URI` is wrong. For Atlas, allow your IP under Network Access. |
| `npm install` peer dependency errors | Run `npm install --legacy-peer-deps` |
| Admin shows type or import map errors after adding a block | Run `npm run generate:types` and `npm run generate:importmap`, then restart |
| `/` returns 404 | The route must be `[[...slug]]` (double brackets) |
| Page changes do not show on the site | Publish the page (drafts are not public) and check that revalidation is enabled |
| Errors from a folder path with spaces | Move the project to a folder name without spaces |

---


env :
# Database connection string (MongoDB)
DATABASE_URI=mongodb: ....../payload-website
DATABASE_URL=mongodb: ...../payload-website

# Used to encrypt JWT tokens
PAYLOAD_SECRET=e****************a

# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Secret used to authenticate cron jobs
CRON_SECRET=b***************3

# Used to validate preview requests
PREVIEW_SECRET=a************0
