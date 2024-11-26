import React, { useState } from 'react';

interface AffiliationCardProps {
  title: string;
  description: string;
  url: string;
  videoUrl: string; // Add videoUrl to props
  isDarkMode: boolean; // Add isDarkMode to props
}

const AffiliationCard: React.FC<AffiliationCardProps> = ({ title, description, url, videoUrl, isDarkMode }) => {
  return (
    <div 
      style={{ 
        border: "1px solid #ddd", 
        borderRadius: "8px", 
        padding: "20px", 
        margin: "10px", 
        width: "300px", 
        textAlign: "center", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        transition: "transform 0.2s",
        backgroundColor: isDarkMode ? "#444" : "#fff", // Dark mode background
        color: isDarkMode ? "#fff" : "#333" // Text color for dark mode
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <h2 style={{ color: "#1E90FF" }}>{title}</h2> {/* Title color */}
      <p>{description}</p>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          color: "#fff", 
          backgroundColor: "#1E90FF", // Button color
          padding: "10px 15px", 
          borderRadius: "5px", 
          textDecoration: "none",
          marginTop: "10px", // Added margin to separate the button from the text
          display: "inline-block" // Ensures the margin is respected
        }}
      >
        Learn More
      </a>

      {/* Embedded YouTube video */}
      <div style={{ marginTop: "15px" }}>
        <iframe 
          width="100%" 
          height="150" 
          src={videoUrl} 
          title={title} 
          frameBorder="0" 
          allowFullScreen 
          style={{ borderRadius: "8px" }} 
        />
      </div>
    </div>
  );
};

const InformationPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle dark mode
  };

  return (
    <div 
      style={{ 
        padding: "40px", 
        fontFamily: "Arial, sans-serif", 
        color: isDarkMode ? "#fff" : "#333", 
        backgroundColor: isDarkMode ? "#121212" : "#f0f0f0", // Dark mode background
        minHeight: "100vh" // Ensure it covers the full viewport height
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1E90FF" }}>Information Page</h1>
      <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "30px" }}>
        Welcome to the Information Page. Here you can find important information about our services and affiliations.
      </p>

      {/* Dark mode toggle button positioned at the top right */}
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "80px", // Lowered position
          right: "20px", 
          padding: "10px 15px", 
          borderRadius: "5px", 
          backgroundColor: isDarkMode ? "#FFD700" : "#1E90FF", // Gold for light mode, blue for dark mode
          color: isDarkMode ? "#333" : "#fff", 
          border: "none", 
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s"
        }}
      >
        {isDarkMode ? "🌙" : "☀️"} {/* Sun for light mode, moon for dark mode */}
      </button>

      {/* Affiliation Cards with GIF Background */}
      <div style={{ 
        position: "relative", 
        display: "flex", 
        justifyContent: "space-around", 
        flexWrap: "wrap", 
        marginTop: "40px",
        padding: "20px" // Add padding to the card container
      }}>
        {/* Background GIF */}
        <img 
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3l3NDgyYWlrZDBmY3dscTI3YjhtOWd4eHloNHZ6cnJrNDJtMmtpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nTO2uaymyoWKcefgGm/giphy.webp" 
          alt="Background GIF" 
          style={{ 
            position: "absolute", 
            top: "0", 
            left: "0", 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            opacity: 0.1, // Dim effect
            zIndex: 0 // Send to the back
          }} 
        />
        
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-around", width: "100%" }}> {/* Ensures cards are above the GIF */}
          <AffiliationCard
            title="NC State Dining"
            description="Explore the variety of dining options available at NC State, offering nutritious and delicious meals."
            url="https://dining.ncsu.edu/"
            videoUrl="https://www.youtube.com/embed/5vUawHPfaoo" // YouTube embed link
            isDarkMode={isDarkMode} // Pass dark mode state to card
          />
          <AffiliationCard
            title="Campus Enterprises"
            description="Discover how Campus Enterprises enhances the student experience by providing quality services and products."
            url="https://campusenterprises.ncsu.edu/"
            videoUrl="https://www.youtube.com/embed/xkWhFoMtZ4Q" // YouTube embed link
            isDarkMode={isDarkMode} // Pass dark mode state to card
          />
          <AffiliationCard
            title="Wolfpack Outfitters"
            description="Shop the latest NC State apparel and merchandise to show your Wolfpack pride."
            url="https://shop.ncsu.edu/"
            videoUrl="https://www.youtube.com/embed/6855E_xCZec" // YouTube embed link
            isDarkMode={isDarkMode} // Pass dark mode state to card
          />
        </div>
      </div>
    </div>
  );
};

export default InformationPage;

