// vitest-setup.ts

// Load Stencil components.
// Adjust according to your build output of choice *
await import('./dist/testing/testing.esm.js');

export {};
// * Bear in mind, you may need `buildDist: true` (in your stencil.config)
// or `--prod` to use an output other than the browser lazy-loader
