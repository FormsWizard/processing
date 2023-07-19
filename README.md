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
- `./apps/storybook`: documentation of all relevant React components via [storybook.js](https://storybook.js.org/)

- `./packages/state`: the redux state used by `./packages/edit*`
- `./packages/edit*`: editors/visualizations using the same `./packages/state`

- `./packages/example`: an example App (used by `demo` and `dev`)
- `./packages/layout`: ui components used in `./packages/example`
- `./packages/style`: themes shared for all components


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

To synchorize several browser instances via Y-webrtc, start a signaling server:

```
./node_modules/y-webrtc/bin/server.js
```

## Update dependencies

To update all dependencies, run the following command:

```
pnpm update -r --latest
```
