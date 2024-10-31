import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100vh" }}>
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/M.png')", // Updated to the new image path
          backgroundSize: "cover", // Cover the entire area
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // No repeating of the image
          zIndex: -1, // Send to back
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
        <div
          style={{
            width: "600px",
            height: "120px",
            margin: "40px auto 0", // Centered at the top
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "48px", // Increased font size
            lineHeight: "56px",
            color: "#0000FF", // Changed to blue
            textAlign: "center", // Center the text
          }}
        >
          Unlock Your Potential with Us!
        </div>

        <div
          style={{
            width: "600px",
            height: "72px",
            margin: "20px auto 40px", // Centered with spacing
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "22px", // Increased font size
            lineHeight: "28px",
            color: "#4682B4", // Changed to steel blue
            textAlign: "center", // Center the text
          }}
        >
          Join a community that empowers your journey. Sign up today to start making a difference!
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            type="button"
            style={{
              width: "250px",
              height: "60px",
              background: "#1E90FF", // Changed button background to blue
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white", // Ensure text color is white
              border: "none", // Remove border
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
              width: "250px",
              height: "60px",
              background: "#F0F8FF", // Set to a very light blue
              border: "1px solid #1E90FF", // Changed border color to blue
              borderRadius: "10px",
              color: "#1E90FF", // Changed text color to blue
              fontFamily: "Urbanist",
              fontWeight: 600,
              fontSize: "22px", // Increased font size
            }}
          >
            Login
          </button>
        </div>

        <div
          style={{
            width: "735px",
            height: "752px",
            margin: "40px auto", // Centered the image horizontally
          }}
        >
          {/* <img
            src="/images/M.png" // Using the same image for display (optional)
            alt="Landing Page Image"
            style={{ width: '100%', height: 'auto' }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
