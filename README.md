This repository hosts a [Next.js](https://nextjs.org) App Router project pre-configured with **TypeScript**, **Tailwind CSS**, and a **shadcn/ui-friendly** file layout. The landing page renders the animated `BackgroundPaths` hero.

## Quick start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo. Edit `src/app/page.tsx` or any component under `src/components` and the page will live-reload.

## Default project paths

- **Reusable UI primitives** live in `src/components/ui`. This matches the shadcn/ui CLI expectation, so components generated with `npx shadcn@latest add button` drop directly into this folder without additional alias work.
- **Feature/demo components** can live alongside primitives (e.g. `src/components/demo`).
- **Global styles** live at `src/app/globals.css`. Tailwind utility classes consume the CSS custom properties defined here (background, foreground, border, etc.).

Keeping the `ui` folder co-located under `src/components/ui` ensures:

1. Imports stay consistent with the alias `@/components/ui/*` already configured in `tsconfig.json`.
2. The shadcn CLI can automatically find the directory without custom prompts.
3. Shared styling tokens stay colocated with components that rely on them (e.g. `Button`, `BackgroundPaths`).

## shadcn/ui setup checklist

1. Initialize shadcn in this repo:

	```bash
	npx shadcn@latest init
	```

	When prompted, answer with:

	- **Style**: Default (Tailwind)
	- **Base color**: Slate (or preferred palette)
	- **Global CSS file**: `src/app/globals.css`
	- **CSS variables file**: `src/app/globals.css`
	- **Components directory**: `src/components/ui`
	- **Aliases**: `@/*`

2. Add components as needed:

	```bash
	npx shadcn@latest add button card accordion
	```

3. Each generated file will automatically use the `cn` helper from `src/lib/utils.ts` and the design tokens defined in `globals.css`.

Because Tailwind and TypeScript are already configured, you can run the CLI immediately—no extra tooling required.

## Background Paths component

- Source: `src/components/ui/background-paths.tsx`
- Demo wrapper: `src/components/demo/background-paths-demo.tsx`
- Usage: Render `<DemoBackgroundPaths />` inside any client or server component. The root page already does this.
- Dependencies: `framer-motion` for animation, `@/components/ui/button` for CTA styling.

Replace the `title` prop or wrap the component in your own layout as needed.

## Resume timeline interaction

- Source: `src/components/ui/track-element-within-viewport.tsx`
- The hero CTA (“Discover Excellence”) reveals this scroll-tracked section and scrolls to it automatically.
- Customize the `resumeHighlights` array to change titles, summaries, or keywords for each experience.

The component mirrors the provided `TrackElementWithinViewport` behavior with a Tailwind-friendly aesthetic that matches the hero background.

## Helpful scripts

```bash
npm run dev    # start dev server
npm run lint   # run ESLint
npm run build  # production build
npm start      # run built app
```

## Deployment

Deploy anywhere Next.js runs (Vercel, Netlify, etc.). On Vercel, no extra configuration is needed—just import this repository and hit deploy.
