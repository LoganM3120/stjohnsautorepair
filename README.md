# St. John&apos;s Auto Repair

A responsive, mobile-first marketing site for St. John&apos;s Auto Repair built with React, TypeScript, and Vite. The project is structured to support future dynamic enhancements such as API integrations, CMS connections, or booking workflows.

## Getting Started

```bash
npm install
npm run dev
```

The development server will start on [http://localhost:5173](http://localhost:5173).

## Available Scripts

- `npm run dev` – start the Vite development server
- `npm run build` – type-check the project and create an optimized production build
- `npm run preview` – preview the production build locally

## Project Structure

```
├── public/            # Static assets such as the favicon
├── src/
│   ├── components/    # Reusable UI pieces (header, footer, layout)
│   ├── pages/         # Route-based page components
│   ├── styles/        # Global styles and design tokens
│   └── main.tsx       # Application entry point with routing
├── index.html         # Vite entry HTML file
├── package.json       # Dependencies and scripts
└── tsconfig*.json     # TypeScript configuration
```

## Pages

- **Home** – Highlights services, value propositions, and calls to action.
- **Request a Quote** – Collects customer details including full name, email, phone number, VIN, concern description, and preferred communication method.

## Future Enhancements

- Integrate the quote form with a backend service or CRM.
- Add analytics, reviews, and service scheduling flows.
- Expand component library for reuse across additional pages.
