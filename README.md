# FormsWizard Processing

## Open a Demo

Run the following command:

```sh
pnpm export
(cd apps/demo/out/; python -m http.server) & 
xdg-open http://localhost:8000
```


## Apps and Packages

This [Turborepo](https://turbo.build/) includes the following packages/apps:

- `./apps/demo`: a [Next.js](https://nextjs.org/) app containing the live demo
- `./apps/dev`: another [Next.js](https://nextjs.org/) app including some dev output
- `./apps/storybook`: documentation of all React components via [storybook.js](https://storybook.js.org/)

- `'./packages/ui`: a React component library (used by `demo` and `dev`)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).


## Build

To build all apps and packages, run the following command:

```
pnpm build
```

## Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```
