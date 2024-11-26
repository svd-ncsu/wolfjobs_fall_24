import { useUserStore } from "../../store/UserStore";
import NavBar from "./NavBar";
import NavBarItem from "./NavBarItem";

const Header = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const role = useUserStore((state) => state.role);

  return (
    <div className="sticky top-0 z-40 w-full bg-[#A6F8FB] shadow-lg transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 lg:px-8 mx-4 lg:mx-0">
          <div className="relative flex items-center justify-between border-b border-gray-200">
            <a
              className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
              href={isLoggedIn ? "/dashboard" : "/"}
            >
              <img
                alt="logo"
                src="/images/wolfjobs-logo.png"
                className="h-10 p-0"
              />
            </a>
            <ul className="ml-4 flex space-x-8">
              {role === "Manager" && isLoggedIn && (
                <NavBarItem link="/dashboard" text="My Listings" />
              )}
              {role === "Applicant" && isLoggedIn && (
                <NavBarItem link="/dashboard" text="My Applications" />
              )}
              {isLoggedIn && <NavBarItem link="/explore" text="All Jobs" />}
              {role === "Admin" && isLoggedIn && (
                <NavBarItem link="/AdminApplicationsPage" text="All Applications" />
              )}
              {role === "Admin" && isLoggedIn && (
                <NavBarItem link="/AdminManagerPage" text="All Managers" />
              )}
              
              
            </ul>
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

