# Mounsin1

Application frontend built with Vite, React, and TypeScript.

## Structure

- `src/` - application source code
- `public/` - static assets

## Scripts

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes

This repo uses SSH for pushing; ensure your SSH key is added to GitHub.

## Map demo (local)

This project includes a simple map demo using `react-leaflet` to visualize doctors, pharmacies and facilities across Gabon.

Install additional packages:

```bash
npm install react-leaflet leaflet
```

Run the dev server and open the demo page at `/map-demo` (or import the `MapDemo` page into your routing):

```bash
npm run dev
```

Notes:
- Ensure Vite is configured to serve static assets. Leaflet CSS is imported in the component.
- The demo page `src/pages/MapDemo.tsx` uses mock data from `src/data/mockData.ts`.
