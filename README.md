This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The project uses OpenAI for chat completion, so an API key is required. Make sure to add one in the `.env` file or the project won't work.

```bash
OPENAI_API_KEY=
```

## Local Development

Either docker-compose or Vercel Postgres can be used locally to set up the database.

**WARNING**: If modifying the `schema.prisma` file to change the datasource, the `npx prisma generate` command needs to be ran again so that Prisma loads the corresponding env variables.

- With docker-compose:

```bash
# .env
DATABASE_URL=
```

```bash
# .prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```bash
docker-compose up -d
```

- With Vercel Postgres

```bash
# .env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

```bash
# .prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

## Next Steps

With the database running and OpenAI set up, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
