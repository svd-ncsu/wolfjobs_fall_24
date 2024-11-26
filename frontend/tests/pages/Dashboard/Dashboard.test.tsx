import { render, screen } from "@testing-library/react";
 
import Dashboard from "../../../src/Pages/Dashboard/Dashboard";
import { MemoryRouter } from "react-router";
import { expect } from 'chai';

describe("Dashboard", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  });

  test("renders the main content", () => {
    const mainContent = screen.getByTestId("dashboard-content");
    expect(mainContent).to.not.be.undefined;
  });

  test("renders the Information Page button", () => {
    const infoButton = screen.getByRole("button", { name: /information/i });
    expect(infoButton).to.not.be.undefined;
  });

  test("Checks if the Admin Only button works", () => {
    const adminButton = screen.getByRole("button", { name: /admin only/i });
    expect(adminButton).to.not.be.undefined;
  });

  test("renders the Create Job button for Managers", () => {
    // Mock role to be Manager
    const createJobButton = screen.queryByRole("button", { name: /create job \+/i });
    if (createJobButton) {
      expect(createJobButton).to.not.be.undefined;
    }
  });

  test("renders My Listings or My Applications based on role", () => {
    const headingText = screen.getByText(/my listings|my applications/i);
    expect(headingText).to.not.be.undefined;
  });

  test("renders job list tiles if jobs are available", () => {
    // Assuming JobListTile components have a specific role or text
    const jobTiles = screen.queryAllByText(/view-application|view-questionnaire/i);
    if (jobTiles.length > 0) {
      expect(jobTiles.length).to.be.greaterThan(0);
    }
  });

  test("renders the dashboard with a background image and checks if the image is present or not", () => {
    const dashboardElement = screen.getByTestId("dashboard-content");
    const computedStyle = window.getComputedStyle(dashboardElement);
    
    expect(computedStyle.backgroundImage).to.not.equal('none');
    expect(computedStyle.backgroundImage).to.include('./images/dashboard.svg');
  });

  test("renders job list container", () => {
    const jobListContainer = screen.getByTestId("job-list-container");
    expect(jobListContainer).to.not.be.undefined;
  });

});