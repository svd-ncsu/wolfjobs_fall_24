const NoJobSelected = () => {
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="flex flex-col ">
          <div className="h-12 w-12 -m-1 mb-0">
            <img src="images/error.svg" />
          </div>
          <div className="text-[#000000]">Nothing to show!</div>
          <div className="text-[#000000]">Select a job for more details</div>
        </div>
      </div>
    </>
  );
};

export default NoJobSelected;

