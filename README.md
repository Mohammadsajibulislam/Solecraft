# Solecraft

Solecraft is a footwear storefront concept for considered, long-lasting shoes. Browse a curated collection of sneakers, boots, trail shoes, formal styles, and sandals.

## Links

- **Live demo:** [solecraft-sandy.vercel.app](https://solecraft-sandy.vercel.app/)
- **GitHub repository:** [Mohammadsajibulislam/Solecraft](https://github.com/Mohammadsajibulislam/Solecraft)

## Features

- Browse products by category
- Search, sort, and filter the collection
- Save favorite products during your visit
- Open product quick views with details, colors, and sizes
- Responsive storefront layout with product, craft, and review sections

> This is a front-end demo with a static product catalogue. It does not include a backend, persistent favorites, cart, or checkout.

## Built with

- React
- Vite
- Tailwind CSS

## Getting started

You will need Node.js and npm installed.

```bash
# Clone the repository
git clone https://github.com/Mohammadsajibulislam/Solecraft.git
cd Solecraft

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  components/  Storefront sections and reusable UI
  data/        Product, category, and page content
  hooks/       UI state hooks
  utils/       Shared utility functions
public/
  images/      Product and storefront images
```
