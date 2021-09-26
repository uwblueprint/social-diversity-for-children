# Social Diversity for Children Foundation

Program registration platform for [Social Diversity for Children Foundation](https://www.socialdiversity.org).

Currently in development!

This project was generated with [superplate](https://github.com/pankod/superplate).

## S21 Team

Project Lead: Eric Feng\
Product Manager: Raewyn Tsai\
Designers: Stacy Kwok, Christina Ru\
Developers: Jason Huang, Soha Khan, Cindy Wang, Brandon Wong, Victor Yun, Mahad Zaryab

## F21 Team

Project Lead: Rickson Yang\
Product Manager: Emily Nairn\
Designers: Rebecca Ma, Vedant Patel\
Developers: Matthew Geng, Neel Ismail, Amy Li, Greg Maxin, Brandon Wong, Kevin Zhang

## Project Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/)
   framework
2. [Prisma](https://www.prisma.io/) ORM for [PostgreSQL](https://www.postgresql.org/)
3. [Chakra UI](https://chakra-ui.com/) for building accessible and responsive frontend components
4. [i18next](https://www.i18next.com/) for internationalization and translations, specifically [next-i18next](https://github.com/isaachinman/next-i18next)
5. [NextAuth.js](https://next-auth.js.org/) for authentication
6. Service: [Amazon S3](https://aws.amazon.com/s3/) for file storage
7. Service: [Amazon SES](https://aws.amazon.com/ses/) for email service
8. Service: [Railway](https://docs.railway.app/) for deployment and database hosting
9. [Unstated Next](https://github.com/jamiebuilds/unstated-next) for state management
10. [SWR](https://swr.vercel.app/) React Hook library for data fetching

### Project Structure

```bash
.
├── .github
│   ├── workflows/ci.yml # Github workflow
│   └── pull_request_template.md # PR template
│
├── pages # Pages
│   ├── _app.tsx
│   ├── api # API routes
│   └── index.tsx
│
├── prisma # Prisma ORM
│   └── schema.prisma # Prisma Schema
│
├── public
│   ├── icons # Icons
│   └── locales # Translations
│
├── models # Typescript types
│
├── src # Frontend tools
│   ├── components # Components
│   └── definitions # Chakra
│   └── styles # CSS and Colours
│
├── utils # Utility functions
│   └── validation # Data/Input Validators
│
├── services # Third party services
│   ├── auth
│   ├── aws
│   ├── database
│   ├── nodemailer
│   └── stripe
│
# Misc individual files
├── .babelrc
├── .eslintignore
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── LICENSE
├── README.md
├── i18n.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── yarn.lock
```

## Local Dependencies

1. [Heroku Client](https://devcenter.heroku.com/articles/heroku-cli)
2. [NPM](https://nodejs.org/en/download/)
3. [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Run Locally

Reset your database on Heroku and then deploy your database schema run (one-time):

```bash
# Drop all tables from current Heroku postgres database
heroku pg:reset -a YOUR_APP_NAME

# Deploy schema.sql to Heroku postgres
heroku pg:psql -a YOUR_APP_NAME -f prisma/schema.sql

# Regenerate Prisma schema and client
npx prisma introspect && npx prisma generate

# Seed your database with sample data
npx ts-node -O {\"module\":\"CommonJS\"} prisma/seed.ts
```

To run the application:

```bash
# Install dependencies
yarn

# Run locally
yarn dev
```

## Development

Linters run automatically as a pre-commit hook on edited `.js, .jsx, .ts, .tsx` files you edit and commit

To run the linters manually:

```bash
# Runs linting
yarn lint

# Correct  linting issues
yarn fix
```

## Deployment

Deployments occur automatically on push to main and staging branches through [Railway](https://docs.railway.app/).

## License

MIT
