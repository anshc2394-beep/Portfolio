# Ansh Chaudhary — Portfolio

A responsive editorial portfolio built with Next.js App Router, React, TypeScript, and handcrafted CSS. The page is statically exported; it needs no database, environment variables, or external service at runtime.

## Development

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm run lint
npm run typecheck
npm run build
```

The production website is generated in `out/`. Serve that directory with any static host. `next start` is not used for a static export.

## Editing content

- `src/data/profile.ts`: biography, contacts, education, internship interests, skills, experience, and projects. Add projects to the typed array.
- `public/Ansh-Chaudhary-Resume.pdf`: replace this file to update both the viewing and download actions.
- `src/components/project.tsx`: project presentations, including the real World Cup Path screenshot and Desk Caddy architecture diagram.
- `src/app/globals.css`: colors, typography, layout, responsive rules, and reduced-motion behavior.
- `src/app/layout.tsx`: title, description, Open Graph, and social metadata.

Optional project demo URLs remain `null` until a verified deployment is available; no broken or placeholder links are displayed. Offerdox dates and completed coursework were not supplied, so neither is invented. The résumé's exact degree name is used. Desk Caddy copy reflects the public repository's appointment-request capture behavior, rather than claiming automatic booking.

## Assets and content

The résumé and portrait were supplied by Ansh. The portrait is available as 320px and 640px WebP files. The World Cup Path screenshot is from his public `World-Cup-Path` repository and converted to WebP. NetWatch and Desk Caddy use labeled architecture diagrams, not fabricated screenshots. No stock photography, fabricated projects, or fabricated metrics are used. Fonts are self-hosted Space Grotesk and DM Sans, licensed under the SIL Open Font License.

Project media, technical takeaways, and expandable details are centralized in `src/data/profile.ts`. See `docs/content-audit.md` for the repository evidence and limitations behind the project copy.

## Verification

Checked at 1440, 1280, 1024, 768, 430, 390, and 320 px for horizontal overflow. Browser checks cover mobile menu toggle and Escape handling, section anchors, keyboard-operated project disclosures, PDF response and download, image loading, reduced motion, and runtime/console errors.

Sites hosting configuration is in `.openai/hosting.json`. The repository source remains usable independently of that hosting provider.
