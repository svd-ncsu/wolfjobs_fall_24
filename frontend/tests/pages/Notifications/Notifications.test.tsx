import { render, screen } from "@testing-library/react";
import React from "react";
import Notifications from "../../../src/Pages/Notifications/Notifications";
import { MemoryRouter } from "react-router";
import { expect } from 'chai';

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

  test("renders the notifications page with a background image", () => {
    const notificationsElement = screen.getByTestId("notifications-content");
    const computedStyle = window.getComputedStyle(notificationsElement);
    
    expect(computedStyle.backgroundImage).to.not.equal('none');
    expect(computedStyle.backgroundImage).to.include('/images/profile.svg');
  });
});