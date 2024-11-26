import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useUserStore } from "../../store/UserStore";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const address = useUserStore((state) => state.address);
  const role = useUserStore((state) => state.role);
  const skills = useUserStore((state) => state.skills);
  const phonenumber = useUserStore((state) => state.phonenumber);
  const affiliation = useUserStore((state) => state.affiliation);
  const availability = useUserStore((state) => state.availability);
  const gender = useUserStore((state) => state.gender);
  const hours = useUserStore((state) => state.hours);
  const resume = useUserStore((state) => state.resume);

  const widthCard = "800px"; // Adjusted width
  const [editMode, setEditMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Ensure skills is an array or fallback to an empty array
  const skillsArray = Array.isArray(skills) ? skills : [];

  return (
    <>
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center min-h-screen"
        style={{
          height: "calc(100vh - 100px)", // Adjusted height
          // backgroundImage: `url('/images/profile.svg')`,
          backgroundColor: isDarkMode ? "#1E2A3A" : "#B0C4DE",
          backgroundSize: "cover",
          filter: "brightness(0.8)",
          padding: "20px 0", // Add padding to the top and bottom
        }}
      >
        {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "8px", // Lowered position
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

      <div
          className={`flex flex-col p-4 mx-6 rounded-2xl shadow-lg ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`} // Apply dark or light background and text colors
          style={{ width: `${widthCard}` }}
        >
          <div className="relative">
            {editMode ? (
              <AiOutlineClose
                onClick={(e: any) => {
                  e.preventDefault();
                  setEditMode(false);
                }}
                className="cursor-pointer text-red-500 hover:text-red-700 absolute top-0 right-0"
              />
            ) : (
              <BiSolidPencil
                onClick={(e: any) => {
                  e.preventDefault();
                  setEditMode(true);
                }}
                className="cursor-pointer text-blue-500 hover:text-blue-700 absolute top-0 right-0"
              />
            )}
          </div>
          <div className="my-2 text-2xl font-bold text-center">Profile</div>
          <div className="flex justify-between gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-2 w-1/2">
              {!editMode &&
                [
                  { label: "Name", value: name },
                  { label: "Email", value: email },
                  { label: "Role", value: role },
                  { label: "Address", value: address },
                  { label: "Phone Number", value: phonenumber },
                ].map(({ label, value }) => (
                  <div
                    className={`flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-3 w-full shadow-md hover:shadow-xl transition-all ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                    key={label}
                    style={{ minWidth: "180px" }}
                  >
                    <span className="text-lg font-semibold">{label}:</span>
                    <span
                      className={`text-center ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {value || " -- "}
                    </span>
                  </div>
                ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2 w-1/2">
              {!editMode &&
                [
                  {
                    label: "Skills",
                    value: skillsArray.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {skillsArray.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm shadow-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "No skills available"
                    ),
                  },
                  { label: "Affiliation", value: affiliation },
                  { label: "Availability", value: availability },
                  { label: "Gender", value: gender },
                  { label: "Resume", value: resume },
                ].map(({ label, value }) => (
                  <div
                    className={`flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-3 w-full shadow-md hover:shadow-xl transition-all ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                    key={label}
                    style={{ minWidth: "180px" }}
                  >
                    <span className="text-lg font-semibold">{label}:</span>
                    <span
                      className={`text-center ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {value || " -- "}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          {editMode && (
            <ProfileEdit
              props={{
                name,
                email,
                address,
                role,
                skills: skillsArray,
                phonenumber,
                affiliation,
                availability,
                gender,
                hours,
              }}
              isDarkMode={isDarkMode} // Pass dark mode state here
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

