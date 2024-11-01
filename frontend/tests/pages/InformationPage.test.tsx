import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InformationPage from '../../src/Pages/InformationPage'; // Adjust the import path as necessary

describe("InformationPage", () => {
  beforeEach(() => {
    render(<InformationPage />);
  });

  it("renders the Information Page title", () => {
    const titles = screen.getAllByText(/Information Page/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  it("displays the welcome message", () => {
    const welcomeMessage = screen.getByText(/Welcome to the Information Page/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders the dark mode toggle button", () => {
    const toggleButton = screen.getByRole('button', { name: /☀️|🌙/i });
    expect(toggleButton).toBeInTheDocument();
  });

 



  it("renders the affiliation cards with correct titles", () => {
    const cardTitles = [
      "NC State Dining",
      "Campus Enterprises",
      "Wolfpack Outfitters"
    ];
    
    cardTitles.forEach(title => {
      const cardTitle = screen.getByText(title);
      expect(cardTitle).toBeInTheDocument();
    });
  });

  it("checks if the embedded YouTube videos are rendered", () => {
    const videos = [
        { title: 'NC State Dining', url: 'https://www.youtube.com/embed/5vUawHPfaoo' },
        { title: 'Campus Enterprises', url: 'https://www.youtube.com/embed/xkWhFoMtZ4Q' },
        { title: 'Wolfpack Outfitters', url: 'https://www.youtube.com/embed/6855E_xCZec' },
      ];
  
      videos.forEach(({ title, url }) => {
        const iframe = screen.getByTitle(title); // Using title to find iframe
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', url);
      });
    });

  it("checks if the GIF background is rendered", () => {
    const gif = screen.getByAltText(/Background GIF/i);
    expect(gif).toBeInTheDocument();
    expect(gif).toHaveAttribute('src', "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3l3NDgyYWlrZDBmY3dscTI3YjhtOWd4eHloNHZ6cnJrNDJtMmtpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nTO2uaymyoWKcefgGm/giphy.webp");
  });

  it("ensures all buttons in the affiliation cards are functioning as links", () => {
    const affiliations = [
        {
          title: 'NC State Dining',
          url: 'https://dining.ncsu.edu/',
        },
        {
          title: 'Campus Enterprises',
          url: 'https://campusenterprises.ncsu.edu/',
        },
        {
          title: 'Wolfpack Outfitters',
          url: 'https://shop.ncsu.edu/',
        },
      ];
  
      // Get all "Learn More" buttons
      const buttons = screen.getAllByText(/Learn More/i);
  
      // Verify each button and its corresponding URL
      buttons.forEach((button, index) => {
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', affiliations[index].url);
      });
    });

  it("ensures that the 'Learn More' buttons open in a new tab", () => {
    const buttons = screen.getAllByText(/Learn More/i);
    buttons.forEach(button => {
      expect(button).toHaveAttribute('target', '_blank');
      expect(button).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
