# MyXDC monorepo

This is a monorepo for the MyXDC project. [Testnet](https://testnet.myxdc.org) and [Mainnet](https://app.myxdc.org) are the main deployments of the project.

## What's inside?

This monorepo uses [Turborepo](https://turbo.build/repo) to manage the project. It uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `wallet`: [Next.js](https://nextjs.org/) app
- `@myxdc/ui`: a React component library for the MyXDC project
- `@myxdc/hooks`: a React hook library for the MyXDC project
- `@myxdc/utils`: a utility library for the MyXDC project
- `@myxdc/constants`: a constants library for the MyXDC project
- `@myxdc/eslint`, `@myxdc/prettier`, `@myxdc/typescript`: shared configuration for linting, formatting, and type checking

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm install
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm install
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
