import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div data-testid="login-background"
      style={{
        padding: "180px",
        minHeight: "100vh",
        // overflow: "hidden",
        backgroundImage: isDarkMode
          ? "url('/images/WJ10.jpg')" // Replace with a suitable dark image
          : "url('/images/WJ4.png')", // Light mode background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: isDarkMode ? "#fff" : "#333", // Text color
      }}
    >
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "80px", // Lowered position
          right: "20px", 
          padding: "10px 15px", 
          borderRadius: "5px", 
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0", // Gold for light mode, blue for dark mode
          color: isDarkMode ? "#333" : "#fff", 
          border: "none", 
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s"
        }}
      >
        {isDarkMode ? "🌙" : "☀️"} {/* Sun for light mode, moon for dark mode */}
      </button>

      {/* Background Image
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/WJ4.png')", // Updated to the new image path
          backgroundSize: "cover", // Cover the entire area
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // No repeating of the image
          zIndex: -1, // Send to back
        }}
      /> */}

      {/* Content */}
      {/* <div style={{ position: "relative", zIndex: 1, padding: "20px" }}> */}
        <div
          style={{
            // width: "600px",
            // height: "120px",
            margin: isDarkMode ? "-150px auto 0" : "-40px auto 0", // Centered at the top
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "48px", // Increased font size
            lineHeight: "56px",
            color: isDarkMode ? "#FFFFFF" : "#000000", // Changed to blue
            textAlign: "center", // Center the text
          }}
        >
          Unlock Your Potential with Us!
        </div>

        <div
          style={{
            // width: "600px",
            // height: "72px",
            margin: isDarkMode ? "20px auto 150px" : "20px auto 40px", // Centered with spacing
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "24px", // Increased font size
            lineHeight: "28px",
            color: isDarkMode ? "#FFFFFF" : "#000000", // Changed to steel blue
            textAlign: "center", // Center the text
          }}
        >
          Join a community that empowers your journey. Sign up today to start making a difference!
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: isDarkMode ? "150px" : "20px"}}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            type="button"
            style={{
              boxSizing: "border-box",
              width: "150px",
              height: "60px",
              background: isDarkMode ? "#0F0700" : "#F0F8FF", // Set to a very light blue
              border: isDarkMode ? "1px solid #E16F00" : "1px solid #1E90FF", // Changed border color to blue
              borderRadius: "10px",
              color: isDarkMode ? "#E06F00" : "#1E90FF", // Changed text color to blue
              fontFamily: "Urbanist",
              fontWeight: 600,
              fontSize: "22px", // Increased font size
            }}
          >
            Sign UP
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            type="button"
            style={{
              boxSizing: "border-box",
              width: "150px",
              height: "60px",
              background: isDarkMode ? "#0F0700" : "#F0F8FF", // Set to a very light blue
              border: isDarkMode ? "1px solid #E16F00" : "1px solid #1E90FF", // Changed border color to blue
              borderRadius: "10px",
              color: isDarkMode ? "#E06F00" : "#1E90FF", // Changed text color to blue
              fontFamily: "Urbanist",
              fontWeight: 600,
              fontSize: "22px", // Increased font size
            }}
          >
            Login
          </button>
        </div>

        <div
          // style={{
          //   width: "735px",
          //   height: "752px",
          //   margin: "40px auto", // Centered the image horizontally
          // }}
        >
          {/* <img
            src="/images/M.png" // Using the same image for display (optional)
            alt="Landing Page Image"
            style={{ width: '100%', height: 'auto' }}
          /> */}
        </div>
      </div>
    // </div>
  );
};

export default LandingPage;

