import { render, screen } from "@testing-library/react";
 
import Notifications from "../../../src/Pages/Notifications/Notifications";
import { MemoryRouter } from "react-router";
import { expect } from 'chai';
import axios from 'axios';
import { vi } from 'vitest';

// Mocking axios globally before tests run
vi.mock('axios');

// Provide mock responses for the axios calls
axios.get.mockResolvedValue({
  data: { jobs: ['Job 1', 'Job 2'] } // Replace with appropriate mock data for your use case
});
describe("Notifications", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>
    );
  });

  test("renders the Accepted Jobs section", () => {
    const acceptedJobsHeading = screen.getByText(/Accepted Jobs/i);
    expect(acceptedJobsHeading).to.exist;
  });

  test("renders the Rejected Jobs section", () => {
    const rejectedJobsHeading = screen.getByText(/Rejected Jobs/i);
    expect(rejectedJobsHeading).to.exist;
  });
});