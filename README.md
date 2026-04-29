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

## Design System

The entire colour palette derives from a single custom Tailwind scale called `ceramic`, representing the warm cream-to-charcoal tones of fired stoneware.

```
ceramic-50   #FAFAF8  — page background (off-white)
ceramic-100  #F5F3EF  — surface / section background
ceramic-200  #E8E2D9  — borders, dividers
ceramic-300  #D4C4B0  — muted borders
ceramic-400  #C4B89A  — warm mid-tone
ceramic-500  #A89880  — muted text, labels
ceramic-600  #8C8372  — body copy
ceramic-700  #6B6358  — darker muted
ceramic-800  #4A443E  — hover state for dark buttons
ceramic-900  #2D2924  — near-black
ceramic-950  #1A1908  — text, buttons, brand mark
```

### Typography scale

| Token              | Font               | Use                                                    |
| ------------------ | ------------------ | ------------------------------------------------------ |
| `font-display`     | Cormorant Garamond | Page headings, product names, hero                     |
| `font-body`        | Inter              | Labels, navigation, body copy                          |
| `font-handwritten` | Caveat             | Product descriptions, testimonial quotes, footer links |

### Motion

- All scroll-reveal animations use `whileInView` + `viewport={{ once: true }}` so they fire only once per page load.
- The hero uses staggered `motion.` variants with increasing `delay` values.
- The cart drawer and mobile menu use `AnimatePresence` for enter/exit transitions.
- The rotating "New Arrival" badge is a pure CSS `animate-spin-slow` (20s linear).
- The marquee strip uses a CSS `@keyframes marquee` animation — no JS scroll handler.

---

## Pages & Features

### `/` — Home

Full-scroll experience with 11 sections in this order:

1. **Hero** — split-screen, "FOREVER BOWLS" display heading, two CTAs
2. **Countdown Strip** — live 48-hour timer for limited drops
3. **Category Grid** — 4-column editorial: Idea Hub, Pet Drop, Bowl Muse, Paint Your Own
4. **Featured Product** — "New Arrival" rotating badge, product info
5. **UGC Strip** — simulated customer photo grid
6. **Testimonials** — handwritten Caveat quotes, brand logo row
7. **Marquee** — scrolling ticker strip
8. **About Section** — founder story with overlapping image placeholders
9. **Info Section** — "read more about custom bowls" editorial split
10. **FAQ** — 2-column animated accordion
11. **Newsletter** — name + email signup with toast feedback

### `/customise` · `/ready-to-ship` · `/clay-dates` · `/idea-hub`

All route to `ProductsPage` with a `filter` prop:

- `custom` — shows only `customizable: true` products
- `ready` — shows only `inStock: true, customizable: false` products
- `all` — shows everything

Product cards display name, price, and a quick "Add to Cart" / "Customise" CTA.

### `/products/:id`

Product detail page with:

- Variant selector (size, gem style)
- Inscription input for personalised name engraving
- Quantity stepper
- Price-multiplied "Add to Cart" button

### `/login` · `/signup`

Tab-based auth page with:

- Email + password fields
- Show/hide password toggle
- "Forgot password?" → inline password reset mode (no page change)

### `/about`

Three sections:

1. Dark full-height hero — "OUR STORY" + handwritten subtitle
2. "Make your dream bowl." — left text, right studio shelf placeholder
3. 3-column features strip — processing time, after care, eco-friendly packaging

### `/contact`

Three sections:

1. Fabric-drape hero — "Contact" display heading + handwritten subtitle
2. "Contact Details" — address, Instagram, email, hours + tall image placeholder
3. "Contact us" form — name, email, textarea, SEND button with loading state

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

## Shopify Integration

The app is structured so every data call can be replaced with a Shopify Storefront API call. Search the codebase for `// Shopify` to find every integration point.

### Authentication (`src/contexts/AuthContext.tsx`)

Replace the mock `await setTimeout` calls with:

```typescript
// Login
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken { accessToken expiresAt }
    userErrors { field message }
  }
}

// Signup
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer { id email }
    userErrors { field message }
  }
}

// Password reset
mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    userErrors { field message }
  }
}
```

### Checkout (`src/components/cart/CartSidebar.tsx`)

Replace the `handleCheckout` toast stub with a Shopify checkout creation:

```typescript
mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout { webUrl }
  }
}
// Then redirect to checkout.webUrl
```

### Products (`src/constants/index.ts`)

Replace the `PRODUCTS` array with a Storefront API query:

```graphql
query Products($first: Int!) {
  products(first: $first) {
    nodes {
      id
      title
      description
      handle
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
```

### Environment variables

Create a `.env.local` file in the project root:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-public-storefront-token
```

Access them in code via `import.meta.env.VITE_SHOPIFY_STORE_DOMAIN`.

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
