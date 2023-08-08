## Add a new visualization

To add a new visualization do this steps:

1. Create a new package for the new visualization. You can copy and adapt an existing visualization:

```sh
cp packages/edit-timeline packages/edit-mynewvisualization
```

 * Edit `packages/edit-mynewvisualization/package.json` to add your required dependencies

 * add `"edit-mynewvisualization": "workspace:*"` in `packages/example/package.json` as dependency.

```sh
pnpm install
```

 * Replace `packages/edit-mynewvisualization/features/*` with your components

 * Export your main component in `packages/edit-mynewvisualization/index.tsx`

 * Use the redux state from (selectors and reducers) defined in `packages/state/features/slices/*`

 2. Edit `packages/example/features/app/Tabs.tsx` to add your component as new tab of the example-app
