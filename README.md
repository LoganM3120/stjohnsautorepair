# St. John's Auto Repair

A responsive, mobile-first marketing site for St. John's Auto Repair built with Next.js, TypeScript, and the App Router. The project is configured for static export so it can be deployed to GitHub Pages or any static hosting provider while keeping the door open for future dynamic enhancements.

## Getting Started

```bash
npm install
npm run dev
```

The development server will start on [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` – start the Next.js development server
- `npm run build` – create an optimized production build
- `npm run start` – serve the production build locally
- `npm run lint` – run ESLint using Next.js defaults
- `npm run export` – generate a static export in the `out/` directory

## Project Structure

```
├── public/            # Static assets such as the favicon and branding imagery
├── src/
│   ├── app/           # Next.js App Router routes, layout, and global styles
│   │   ├── about/     # About page route
│   │   ├── globals.css# Global styles and design tokens
│   │   ├── layout.tsx # Root layout with shared header and footer
│   │   └── page.tsx   # Homepage content
│   └── components/    # Reusable UI pieces (header and footer)
├── next.config.mjs    # Next.js configuration for static export
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration with path aliases
└── README.md          # Project documentation
```

## Pages

- **Home** – Highlights services, value propositions, and calls to action.
- **About** – Shares Lindon's experience, customer testimonials, and service philosophy.

## Deployment Notes

- Run `npm run build && npm run export` to produce a static site in the `out/` directory that is ready to upload to GitHub Pages.
- Update the `next.config.mjs` file if you need to set a `basePath` or `assetPrefix` for a project site hosted on a subpath.

## Future Enhancements

- Integrate the quote call-to-action with a backend service or CRM.
- Add analytics, reviews, and service scheduling flows.
- Expand the component library for reuse across additional pages.
