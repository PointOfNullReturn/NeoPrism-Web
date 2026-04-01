# NeoPrism

A faithful web-based clone of Deluxe Paint II–IV (including AGA), built with React 19, TypeScript, and Vite.

NeoPrism recreates the tools, workflows, and capabilities of the classic Amiga Deluxe Paint series with a modern UI that feels natural in the browser.

## Project Structure

```
src/
  app/          // entry App + shells
  components/   // React UI pieces
  state/        // Zustand store, commands, tools
  rendering/    // canvas + pixel buffers
  canvas/       // pointer events + transforms
  iff/          // ILBM parsing
  utils/        // helpers (flood fill, color, etc.)
  assets/       // static assets
  styles/       // CSS modules/global styles
```

## Commands

- `npm run dev` – Vite dev server with HMR
- `npm run build` – Type-check + production bundle
- `npm run preview` – Serve the built bundle
- `npm run lint` / `npm run lint:fix` – ESLint (strict React 19 + TS)
- `npm run format` / `npm run format:check` – Prettier (2 spaces, single quotes, trailing commas)
- `npm run test` – Vitest watch mode (jsdom)
- `npm run test:run` – Vitest single run (CI)
- `npm run test:coverage` – Vitest with coverage

## Testing

Vitest + React Testing Library are preconfigured via `vitest.setup.ts`. Place tests next to source files (`*.test.tsx`) or under `__tests__` folders.

## Setup

```bash
npm install
npm run prepare   # install Husky pre-commit hooks
npm run dev
```
