// tests/setup.ts

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

// Extend Vitest's expect with additional matchers from jest-dom
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Handle unhandled promise rejections (ignoring them)
process.on('unhandledRejection', (reason, promise) => {
  // Log or ignore the unhandled rejection
  console.warn('Ignoring unhandled rejection:', reason);
  // You can add more handling logic here if needed
});
