import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Explore from "../../../src/Pages/Explore/Explore";
import { MemoryRouter } from "react-router";
import { expect } from 'chai';

describe("Explore", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );
  });

  test("renders the search input", () => {
    const searchInput = screen.getByPlaceholderText("Search Jobs");
    expect(searchInput).to.exist;
  });

  test("renders the sort buttons", () => {
    const sortPayButton = screen.getByRole("button", { name: /sort by highest pay/i });
    const sortLocationButton = screen.getByRole("button", { name: /sort by location/i });
    expect(sortPayButton).to.exist;
    expect(sortLocationButton).to.exist;
  });

  test("renders the employment type filter buttons", () => {
    const fullTimeButton = screen.getByRole("button", { name: /show full-time jobs/i });
    const partTimeButton = screen.getByRole("button", { name: /show part-time jobs/i });
    expect(fullTimeButton).to.exist;
    expect(partTimeButton).to.exist;
  });

  test("renders the job status toggle button", () => {
    const jobStatusButton = screen.getByRole("button", { name: /show (open|closed) jobs/i });
    expect(jobStatusButton).to.exist;
  });

  test("renders the explore page with a background image", () => {
    const exploreElement = screen.getByTestId("explore-content");
    const computedStyle = window.getComputedStyle(exploreElement);
    
    expect(computedStyle.backgroundImage).to.not.equal('none');
    expect(computedStyle.backgroundImage).to.include('./images/dashboard.svg');
  });

  test("toggles employment type buttons correctly when Show Full-Time is clicked", () => {
    const fullTimeButton = screen.getByRole("button", { name: /show full-time jobs/i });
    const partTimeButton = screen.getByRole("button", { name: /show part-time jobs/i });

    // Initially, both buttons should be OFF
    expect(fullTimeButton.textContent).to.include('Show Full-Time Jobs : Off');
    expect(partTimeButton.textContent).to.include('Show Part-Time Jobs : Off');

    // Click the Show Full-Time button to turn it ON
    fireEvent.click(fullTimeButton);

    // Check if Show Full-Time is now ON and Show Part-Time is OFF
    expect(fullTimeButton.textContent).to.include('Show Full-Time Jobs : On');
    expect(partTimeButton.textContent).to.include('Show Part-Time Jobs : Off');

    // Click the Show Part-Time button to turn it ON
    fireEvent.click(partTimeButton);

    // Check if Show Part-Time is now ON and Show Full-Time is OFF
    expect(partTimeButton.textContent).to.include('Show Part-Time Jobs : On');
    expect(fullTimeButton.textContent).to.include('Show Full-Time Jobs : Off');
  });
});