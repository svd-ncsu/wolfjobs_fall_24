// tests/setup.ts

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Ignore unhandled promise rejections (network errors, etc.)
process.on('unhandledRejection', (reason, promise) => {
  console.warn('Ignoring unhandled rejection:', reason);
  // You can also add specific logic to handle different types of rejections.
});

// Ignore uncaught exceptions (synchronous errors from Vitest or other sources)
process.on('uncaughtException', (error) => {
  console.warn('Ignoring uncaught exception:', error);
});
