# dogsplace. — Handmade Ceramic Dog Bowls

An e-commerce web application for a small ceramics studio specialising in handmade, customisable dog bowls. The design language is inspired by the editorial, organic aesthetic of premium artisan ceramic brand — minimalist, warm, and intentional.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Pages & Features](#pages--features)
- [Getting Started](#getting-started)
- [Shopify Integration](#shopify-integration)
- [Testing](#testing)
- [Scripts](#scripts)

---

## Overview

**dogsplace.** is a React + TypeScript single-page application that replicates the look and feel of a premium handmade ceramics storefront. It includes:

- A scrollytelling homepage with a live countdown timer, editorial category grid, rotating product badge, UGC photo strip, testimonials, and FAQ.
- Product listing and detail pages with variant selection and personalisation input.
- A slide-out cart with quantity controls.
- Authentication pages (login, signup, password reset).
- About Us and Contact pages matching the brand aesthetic.
- A footer with newsletter signup.

The backend is designed to connect to **Shopify's Storefront API**. All API integration points are clearly marked in the source with `// Shopify ... integration point` comments so they can be wired up with real credentials.

---

## Tech Stack

| Tool                      | Version      | Purpose                                                    |
| ------------------------- | ------------ | ---------------------------------------------------------- |
| **React**                 | 18.3         | Component-based UI                                         |
| **TypeScript**            | 5.5 (strict) | Type safety throughout                                     |
| **Vite**                  | 5.4          | Dev server and production build                            |
| **Tailwind CSS**          | 3.4          | Utility-first styling with custom ceramic palette          |
| **Framer Motion**         | 11           | Page animations, scroll reveals, slide-out drawer          |
| **React Router**          | v6           | Client-side routing                                        |
| **React Hot Toast**       | 2.4          | Toast notifications                                        |
| **Lucide React**          | 0.441        | Icon set (thin-stroke, consistent with the editorial look) |
| **clsx + tailwind-merge** | latest       | Conditional class composition without conflicts            |
| **Vitest**                | 2.1          | Unit and component testing                                 |
| **Testing Library**       | 16           | DOM-based component tests                                  |

### Fonts (Google Fonts)

| Font                   | Usage                                                                  |
| ---------------------- | ---------------------------------------------------------------------- |
| **Cormorant Garamond** | Display headings — large, editorial serif                              |
| **Inter**              | Body text, UI labels — clean and readable                              |
| **Caveat**             | Handwritten accents — product descriptions, testimonials, footer links |

---

## Project Structure

```
DogsPlace/
├── index.html                    # Entry HTML — loads Google Fonts, sets SEO meta tags
├── vite.config.ts                # Vite + Vitest configuration
├── tailwind.config.ts            # Custom ceramic colour scale and font families
├── tsconfig.json                 # Strict TypeScript config
├── postcss.config.js             # Required by Tailwind
└── src/
    ├── main.tsx                  # App entry — mounts React, wraps providers
    ├── App.tsx                   # Router shell — all routes defined here
    ├── index.css                 # Global styles, CSS tokens, Tailwind directives
    │
    ├── types/
    │   └── index.ts              # Shared TypeScript interfaces (Product, Cart, User…)
    │
    ├── constants/
    │   └── index.ts              # Static data — products, FAQs, categories, testimonials
    │
    ├── lib/
    │   └── utils.ts              # cn(), formatPrice(), getCountdownTarget()
    │
    ├── contexts/
    │   ├── AuthContext.tsx       # User auth state (Shopify integration points inside)
    │   └── CartContext.tsx       # Cart state via useReducer — immutable updates
    │
    ├── hooks/
    │   └── useCountdown.ts       # Real-time countdown timer hook
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx        # Fixed nav — transparent over hero, solid on scroll
    │   │   └── Footer.tsx        # 4-column footer + mini newsletter form
    │   ├── ui/
    │   │   ├── Button.tsx        # Variant button (dark / light / ghost / outline)
    │   │   └── Accordion.tsx     # Accessible expand/collapse with Framer Motion
    │   ├── home/
    │   │   ├── HeroSection.tsx   # Full-screen split-panel hero
    │   │   ├── CountdownStrip.tsx# 48-hour limited-drop timer
    │   │   ├── CategoryGrid.tsx  # 4-column editorial category grid
    │   │   ├── FeaturedProduct.tsx # Rotating SVG badge + new arrival product
    │   │   ├── UGCStrip.tsx      # Customer photo horizontal strip
    │   │   ├── Testimonials.tsx  # Handwritten quote carousel + brand logos
    │   │   ├── AboutSection.tsx  # Founder story with overlapping images
    │   │   ├── InfoSection.tsx   # "Read more about custom bowls" split section
    │   │   ├── FAQSection.tsx    # 2-column accordion FAQ
    │   │   ├── Newsletter.tsx    # Name + email signup
    │   │   └── MarqueeStrip.tsx  # Infinite scrolling ticker
    │   └── cart/
    │       └── CartSidebar.tsx   # Slide-out cart drawer with qty controls
    │
    ├── pages/
    │   ├── HomePage.tsx          # Assembles all home sections in scroll order
    │   ├── AuthPage.tsx          # Login / Signup tabs + password reset
    │   ├── ProductsPage.tsx      # Product grid with search + filter
    │   ├── ProductDetailPage.tsx # Product detail — variants, qty, add to cart
    │   ├── AboutPage.tsx         # About Us — hero, studio section, features strip
    │   └── ContactPage.tsx       # Contact — hero, store details, contact form
    │
    └── test/
        └── setup.ts              # Vitest setup — jest-dom matchers + IntersectionObserver mock
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & run

```bash
# Navigate to the project
cd DogsPlace

# Install dependencies
npm install

# Start development server at http://localhost:5173
npm run dev
```

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Testing

Tests are written with **Vitest** + **Testing Library** following the TDD Red → Green → Refactor cycle.

```bash
npm test              # watch mode
npm run test:coverage # coverage report (target ≥ 80%)
```

### Test files

| File                                 | What it tests                                          |
| ------------------------------------ | ------------------------------------------------------ |
| `src/__tests__/useCountdown.test.ts` | Countdown calculation, clamping at zero, tick updates  |
| `src/__tests__/CartContext.test.tsx` | Add, remove, quantity update, total calculation, clear |
| `src/__tests__/FAQSection.test.tsx`  | Render, toggle open/close, aria-expanded state         |

---

## Scripts

```bash
npm run dev           # Vite dev server with HMR
npm run build         # tsc type-check then Vite production build
npm run preview       # Serve the production build
npm test              # Vitest in watch mode
npm run test:coverage # Coverage report
```
