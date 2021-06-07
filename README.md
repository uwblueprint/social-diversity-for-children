# Social Diversity for Children Foundation

Program registration platform for [Social Diversity for Children Foundation](https://www.socialdiversity.org).

Currently in development!

This project was generated with [superplate](https://github.com/pankod/superplate).

## Team

Project Lead: Eric Feng\
Product Manager: Raewyn Tsai\
Designers: Stacy Kwok, Christina Ru\
Developers: Jason Huang, Soha Khan, Cindy Wang, Brandon Wong, Victor Yun, Mahad Zaryab

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
├── cypress # Cypress tests
├── pages # Pages
│   ├── _app.tsx
│   ├── api # API routes
│   └── index.tsx
├── prisma # Prisma ORM
│   └── schema.prisma # Prisma Schema
├── public
│   ├── icons # Icons
│   └── locales # Translations
├── src # Frontend tools
│   ├── components # Components
│   └── definitions # Chakra
├── test # Jest
│   ├── index.tsx
│   └── jest.config.js
│   └── jest.setup.ts
# Misc individual files
├── .babelrc
├── .eslintignore
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── LICENSE
├── README.md
├── cypress.json
├── i18n.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── yarn.lock
```

## Run Locally

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

## Database 
If you have made changes to the `prisma.schema` file and would like those changes to reflect in your database without generating a migration, run the following command: 
```bash
npx prisma db push
```

If you would like to generate a new migration and then apply the migrations to the database, run the following command: 
```bash
npx prisma migrate dev # generate migrations and apply them
```

## Deployment

Deployments occur automatically on push to main and staging branches through [Railway](https://docs.railway.app/).

## License

MIT
