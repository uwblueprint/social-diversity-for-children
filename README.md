# 📚 Social Diversity for Children Foundation

![Build](https://github.com/uwblueprint/social-diversity-for-children/actions/workflows/ci-push.yml/badge.svg)
![License: MIT](https://img.shields.io/github/license/codeprentice-org/fanotify.svg)
![active development](https://img.shields.io/badge/active%20dev-yes-brightgreen.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/codeprentice-org/fanotify.svg)

Program registration platform for [Social Diversity for Children Foundation](https://www.socialdiversity.org).

Currently in development!

This project was generated with [superplate](https://github.com/pankod/superplate).

## 🍁 F21 Team

Project Lead: Rickson Yang\
Product Manager: Emily Nairn\
Designers: Rebecca Ma, Vedant Patel\
Developers: Matthew Geng, Neel Ismail, Amy Li, Greg Maxin, Brandon Wong, Kevin Zhang

## 😎 S21 Team

Project Lead: Eric Feng\
Product Manager: Raewyn Tsai\
Designers: Stacy Kwok, Christina Ru\
Developers: Jason Huang, Soha Khan, Cindy Wang, Brandon Wong, Victor Yun, Mahad Zaryab

## 🔨 Project Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/)
   framework
2. [Prisma](https://www.prisma.io/) ORM for [PostgreSQL](https://www.postgresql.org/)
3. [Chakra UI](https://chakra-ui.com/) for building accessible and responsive frontend components
4. [i18next](https://www.i18next.com/) for internationalization and translations, specifically [next-i18next](https://github.com/isaachinman/next-i18next)
5. [NextAuth.js](https://next-auth.js.org/) for authentication
6. Service: [Amazon S3](https://aws.amazon.com/s3/) for file storage
7. Service: [Amazon SES](https://aws.amazon.com/ses/) for email service
8. Service: [Amazon Lambda](https://aws.amazon.com/lambda/) and [Amazon Cloudwatch](https://aws.amazon.com/cloudwatch/) for notification mailing
9. Service: [Amazon Systems Manager](https://aws.amazon.com/systems-manager/) for Storing one-time dynamic links
10. Service: [Stripe](https://stripe.com/) for Class payment and product/coupon management
11. Service: [Railway](https://docs.railway.app/) for deployment and database hosting
12. Service: [Heroku](https://www.heroku.com/postgres) for PostgreSQL DB hosting
13. [Unstated Next](https://github.com/jamiebuilds/unstated-next) for state management
14. [SWR](https://swr.vercel.app/) React Hook library for data fetching

### ⚙ Project Structure

```bash
.
├── .github
│   ├── workflows # Github workflows
│   └── pull_request_template.md # PR template
│
├── pages # Pages
│   ├── _app.tsx
│   ├── api # API routes
│   └── index.tsx
│
├── prisma # Prisma ORM
│   │── dev-seeds # seeding data for dev environment
│   │── migrations # migrations for production
│   │── schema.prisma # Prisma Schema
│   │── schema.sql # SQL Schema
│   └── seed.ts # utility to script dev environment
│
├── public
│   ├── icons # Icons
│   └── locales # Translations
│
├── models # Typescript types
│
├── src # Frontend tools
│   ├── components # Components
│   ├── definitions # Chakra
│   └── styles # CSS and Colours
│
├── terraform # Infrastructure as code for dev and prod
│   ├── environments # code separated by environments
│   └── modules # terraform modules for reuse
│
├── types # Dependency types
│
├── utils # Utility functions
│   │── containers # unstated-next containers
│   │── enum # enum utils
│   │── hooks # SWR API hooks
│   │── mail # SES mailing templates
│   │── request # API request utils
│   │── session # Session and authorization utils
│   │── time # time and date utils
│   │── toast # Chakra UI Toast msg utils
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
├── .env.sample # required env vars
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── LICENSE
├── README.md
├── next-i18next.config.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── yarn.lock
```

## 🔗 Local Dependencies

1. [Heroku Client](https://devcenter.heroku.com/articles/heroku-cli)
2. [NPM](https://nodejs.org/en/download/)
3. [Yarn](https://classic.yarnpkg.com/en/docs/install)

## 💻 Run Locally

Reset your database on Heroku and then deploy your database schema run (one-time):

```bash
# Drop all tables from current Heroku postgres database
heroku pg:reset -a <YOUR_APP_NAME>

# Deploy schema.sql to Heroku postgres
heroku pg:psql -a <YOUR_APP_NAME> -f prisma/schema.sql

# Regenerate Prisma schema and client
# optional - `npx prisma introspect`
npx prisma generate

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

## 👨‍💻 Development

Linters run automatically as a pre-commit hook on edited `.js, .jsx, .ts, .tsx` files you edit and commit

To run the linters manually:

```bash
# Runs linting
yarn lint

# Correct  linting issues
yarn fix
```

## ✈️ Migration

NOTE: Before applying your migrations a production environment, ensure the diff via `prisma db pull` lines up with the migrations to be applied.

To migrate a database schema without losing data:

1. change both the `schema.sql` and `schema.prisma` file as required
2. run `prisma migrate dev --name <DESCRIPTIVE_NAME> --create-only` (this will require a [shadow database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database/#cloud-hosted-shadow-databases-must-be-created-manually))
3. after the migration is approved, run `npx prisma migrate deploy` to apply all new migrations

Baseline environment:

Baselining initializes a migration history for databases that contain data and cannot be reset - such as the production database. Baselining tells Prisma Migrate to assume that one or more migrations have already been applied. Run the following command to baseline for each of the required migration: `prisma migrate resolve --applied <MIGRATION_FOLDER_NAME>`

For more info, please reference: [Adding Prisma Migrate to an existing project](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/add-prisma-migrate-to-a-project)

## 🚢 Deployment

Deployments occur automatically on push to main and staging branches through [Railway](https://docs.railway.app/).

## 📝 License

[MIT](LICENSE)
