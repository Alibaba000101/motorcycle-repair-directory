# MotoRepair - Motorcycle Repair Shop Directory

A modern, responsive motorcycle repair shop directory built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Beautiful Hero Section** - Eye-catching landing page with animated gradients and statistics
- **Real-time Search** - Filter shops as you type by name, city, or country
- **Country Filter** - Dropdown menu to filter shops by country
- **Responsive Cards** - Modern card design with hover effects and gradients
- **Shop Details** - Comprehensive detail pages for each repair shop
- **Server Components** - Optimized performance with Next.js App Router
- **Loading States** - Skeleton loaders for better UX
- **Error Handling** - Custom 404 page for missing shops
- **SEO Optimized** - Proper metadata for search engines
- **Dark Theme** - Professional motorcycle/automotive themed design

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS 4** - Utility-first CSS framework
- **Supabase** - Backend and database
- **React Server Components** - For optimal performance

## Getting Started

### Prerequisites

- Node.js 20+ installed
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Make sure your `.env.local` file has your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Make sure your Supabase database has a `repair_shops` table with the following schema:

```sql
CREATE TABLE repair_shops (
  id SERIAL PRIMARY KEY,
  shop_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  website TEXT,
  description TEXT,
  services TEXT,
  opening_hours TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
motorcycle-shops/
├── app/
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Homepage with hero and shop listing
│   ├── globals.css          # Global styles
│   └── shops/
│       └── [id]/
│           ├── page.tsx     # Shop detail page
│           ├── loading.tsx  # Loading state
│           └── not-found.tsx # 404 page
├── components/
│   ├── Header.tsx           # Site header
│   ├── Footer.tsx           # Site footer
│   ├── ShopCard.tsx         # Shop card component
│   ├── ShopList.tsx         # Client component with search/filter
│   └── ShopCardSkeleton.tsx # Loading skeleton
└── lib/
    ├── supabase.ts          # Supabase client
    └── database.types.ts    # TypeScript types
```

## Features Breakdown

### Homepage
- Hero section with gradient animations
- Statistics display (shops, countries, etc.)
- Search bar with real-time filtering
- Country dropdown filter
- Grid of shop cards with hover effects
- About section with feature highlights

### Shop Details Page
- Full shop information display
- Contact information (phone, email, website)
- Location details (address, city, postal code, country)
- Services offered
- Opening hours
- Breadcrumb navigation
- Back to shops button

### Search & Filter
- Real-time search across shop name, city, and country
- Country filter dropdown
- Results counter
- Clear filters button
- Empty state when no results

## Customization

### Colors
The site uses an orange-to-red gradient theme. To change colors, update the Tailwind classes in components:
- Primary gradient: `from-orange-500 to-red-600`
- Background: `bg-black`, `bg-gray-950`, `bg-gray-900`

### Typography
The site uses the Inter font. To change it, update `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";
```

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License - Feel free to use this project for your own purposes.
