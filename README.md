# MyXDC Monorepo

<p align="center">
  <a href="https://myxdc.org"><img alt="website" src="https://img.shields.io/badge/website-myxdc.org-blue.svg"></a>
  <a href="https://github.com/SSekaiking/myxdc/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/badge/license-BSL--1.1-blue.svg"></a>
</p>

<p align="center">
  <img alt="MyXDC Logo" src="https://user-images.githubusercontent.com/54310457/214492232-0907470b-5dec-4624-9992-97557e8c0657.png" width="200" />
</p>

<p align="center">
  <a href="https://twitter.com/MyXDCWallet"><img alt="Follow Twitter" src="https://img.shields.io/twitter/follow/MyXDCWallet?label=Follow&style=social"></a>
</p>

## What's inside?

This monorepo uses [Turborepo](https://turbo.build/repo) to manage the project. It uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `wallet`: MyXDC [web application](https://testnet.myxdc.org) including the wallet and swap 
- `home`: The website [home page](https://www.myxdc.org/help) and [help center](https://www.myxdc.org/help)
- `faucet`: [Faucet](https://faucet.myxdc.org/) for testnet tokens.
- `@myxdc/ui`: Project React component
- `@myxdc/hooks`: Project React hooks
- `@myxdc/utils`: Project utilities
- `@myxdc/constants`: Project constants (configs, artifacts, default tokens...)
- `@myxdc/eslint`, `@myxdc/prettier`, `@myxdc/typescript`: shared configuration for linting, formatting, and type checking

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

If the app is slow or crashes, try increasing the RAM allowed for the node process. For example:

```
export NODE_OPTIONS=--max_old_space_size=8192
```

### Project Branches

In this repository, we use a branching strategy to manage the development of MyXDC. The following branches are used:

- `main`: This is the main branch where the latest stable version of MyXDC is located. It will be deployed to the mainnet at app.myxdc.org
- `beta`: This branch is for testing the software by a smaller group of users before it's released to the live branch. This allows us to get feedback and identify potential issues before releasing to the general public. It will be deployed to mainnet at beta.myxdc.org
- `testnet`: This is a mirror of the `beta` branch but for the Testnet network. It will be deployed to testnet at testnet.myxdc.org
- `alpha`: This branch contains the latest features and updates that are still in development and are being tested internally. It will be deployed to testnet at alpha.myxdc.org
- `dev`: This branch is where developers work on new features and bug fixes. Development takes place here and it's merged into the alpha branch when it's deemed stable. This branch will not be deployed.

By following this branching strategy, we can ensure that the live branch always contains stable and tested code, while also allowing for active development and experimentation.

Please make sure to create a pull request when contributing to the `dev` branch in this repository.

## Bug Reports & Feature Requests

First, we appreciate your help in making MyXDC better. If you've encountered a problem with MyXDC or have an idea for a new feature, please submit a [Github Issue](https://github.com/SSekaiking/myxdc/issues/new) in this repository. To help us resolve the issue quickly, please provide the following information in your report:

- A clear and concise description of the problem
- The operating system and browser on which the problem occurred
- Steps taken to reproduce the issue

We value your feedback and look forward to improving MyXDC with your help.

