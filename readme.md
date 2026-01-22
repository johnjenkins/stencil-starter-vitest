# Stencil + Vitest Starter

A minimal reproduction monorepo for testing Stencil components with the Stencil Vitest library.

## Versions

- `@stencil/core`: latest
- `vitest`: latest
- `@stencil/vitest`: `^4.0.0`
- `@vitest/browser-playwright`: `^4.0.0`

## Setup

```bash
# Install dependencies
pnpm install

# Test (builds stencil first, then runs all tests)
pnpm test 
# or Test and watch
pnpm test:watch
```

Observe the test results in the terminal.