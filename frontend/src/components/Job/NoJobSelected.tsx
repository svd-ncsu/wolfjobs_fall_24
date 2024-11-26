const NoJobSelected = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 -m-1 mb-2">
          <img src={`${isDarkMode ? "images/errord.svg" : "images/error.svg"}`} alt="Error Icon" />
        </div>
        <div
          className={`text-lg font-semibold ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          Nothing to show!
        </div>
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Select a job for more details
        </div>
      </div>
    </div>
  );
};

export default NoJobSelected;
