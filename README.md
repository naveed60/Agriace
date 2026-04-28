# FertilizerPro Website

A modern, responsive website for FertilizerPro - Premium Fertilizers for Sustainable Agriculture. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Fast Performance**: Optimized build with Next.js for lightning-fast page loads
- **Type Safe**: Full TypeScript support for better code quality

## Pages

- **Home**: Landing page with hero section, features, and product preview
- **Products**: Comprehensive product catalog with pricing
- **About**: Company information, mission, and values
- **Contact**: Contact form and business information

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Docker Engine + Docker Compose plugin (for containerized setup)

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd Fertilizers
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Dockerized Setup (App + PostgreSQL + Migrations)

This repository includes a production-style Docker setup:

- `postgres` service (persistent volume + healthcheck)
- `migrate` one-shot service (`prisma migrate deploy`)
- `app` service (Next.js standalone runtime)

### 1. Configure environment

```bash
cp .env.example .env
```

### 2. Build and start all services

```bash
npm run docker:up
```

### 3. Open the app

- App: `http://localhost:${APP_PORT}` (default `http://localhost:3000`)
- Postgres on host: `${POSTGRES_PORT}` (default `5433` in `.env.example`)

### 4. View logs

```bash
npm run docker:logs
```

### 5. Stop services

```bash
npm run docker:down
```

## Project Structure

```
Fertilizers/
├── src/
│   ├── app/                # App router pages
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── products/      # Products page
│   │   ├── layout.tsx     # Root layout with Header/Footer
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   └── components/        # React components
│       ├── layout/        # Layout components
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       └── ui/            # UI components
├── public/                # Static files
├── .prettierrc           # Prettier configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run docker:build` - Build Docker images
- `npm run docker:up` - Build and run app + database + migrations
- `npm run docker:down` - Stop and remove Docker containers
- `npm run docker:logs` - Follow app and database logs
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes

## Customization

### Colors

The website uses a green/agriculture theme. You can customize colors in `src/app/globals.css`:

```css
:root {
  --primary: #22c55e;      /* Green */
  --primary-dark: #16a34a; /* Dark Green */
  --secondary: #84cc16;    /* Lime */
  --accent: #eab308;       /* Yellow */
}
```

### Content

- Update the company name and branding in `src/components/layout/Header.tsx`
- Modify product information in `src/app/products/page.tsx`
- Change contact details in `src/components/layout/Footer.tsx` and `src/app/contact/page.tsx`

## Technologies Used

- **Framework**: Next.js 16.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Font**: Geist Sans & Geist Mono
- **Code Quality**: ESLint 9, Prettier 3.8
- **Icons**: SVG icons (inline)

## Building for Production

```bash
npm run build
npm run start
```

This will create an optimized production build and start the server on port 3000.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live in minutes!

Alternatively, you can deploy to:
- Netlify
- AWS Amplify
- Digital Ocean
- Any platform that supports Node.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For support, email info@fertilizerpro.com or visit the Contact page.

---

Built with Next.js by FertilizerPro Team
