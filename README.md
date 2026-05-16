# MLBB Diamond Top-Up Website

A modern, full-stack Mobile Legends: Bang Bang (MLBB) Diamond Top-Up platform built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB.

## Features

- 🎮 **Modern Gaming UI**: Premium design with glassmorphism and neon accents.
- ⚡ **Instant Top-Up**: Integrated with a mock reseller API for real-time delivery.
- 🔒 **Secure Auth**: Role-based access control with NextAuth (Google & Credentials).
- 📱 **Mobile First**: Fully responsive design for all devices.
- 🌍 **Localization**: Support for English (EN) and Khmer (KM).
- 🌓 **Dark/Light Mode**: Seamless theme switching.
- 📊 **Admin Dashboard**: Comprehensive stats, order, and product management.
- 💳 **Mock Payments**: Integrated UI for KHQR (Bakong), ABA, and Stripe.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion
- **Database**: MongoDB with Mongoose
- **Auth**: NextAuth.js
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (or Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd mlbb-top-up
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in the values.

4. Seed the database:
   ```bash
   npm run db:seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Docker Setup

Run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

## Deployment

This project is ready to be deployed on Vercel.

1. Connect your GitHub repository to Vercel.
2. Add your environment variables in the Vercel dashboard.
3. Deploy!

## License

MIT
