<img src="./src/public/ArtiswayLogo.png" alt="Artisway" height="50">


## Tech Stack Overview
- **Frontend**: Next.js, React, Chakra UI
- **Backend and Database**: Prisma, PostgreSQL, Supabase
- **Deployment**: Vercel
- **Services**: Resend (email service)

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/MarketMate-Seng480/MarketMate.git
cd MarketMate
npm install
```

### Step 2: Set up API keys
1. Create a `.env.local` file in the `/marketmate` directory of the project.
2. Add the following keys to the `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
RESEND_API=""
```
3. Create a `.env` file in the `/marketmate/prisma` directory of the project.
4. Add the following keys to the `.env` file:
```bash
# Transaction connection pooler
DATABASE_URL="postgres://postgres.<...>/postgres?pgbouncer=true&connection_limit=1"

# Session connection pooler: Direct connection to the database. Used for migrations.
DIRECT_URL="postgres://postgres.<...>/postgres"

RESEND_API_KEY=""
```

### Step 3: Run the development server

```bash
npx prisma init
npx prisma db push
npx prisma generate
npm run dev
```

