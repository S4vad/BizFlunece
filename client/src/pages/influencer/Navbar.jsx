import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/darkmode/ModeToggle";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleHover = () => setShowProfile(true);
  const handleOutHover = () => setShowProfile(false);

  const profileLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="relative bg-white shadow-sm dark:bg-night-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-3xl font-bold text-indigo-600">BizFluenze</div>

        <div className="text-md hidden gap-x-12 font-medium text-gray-700 md:flex">
          <Link
            to="/influencer/dashboard"
            className="cursor-pointer transition duration-300 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500"
          >
            Dashboard
          </Link>

          <Link
            to="/influencer/campaignlist"
            className="cursor-pointer transition duration-300 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500"
          >
            Campaigns
          </Link>
        </div>
        <div className="flex gap-10 items-center">
          <div
            className="avatar avatar-online relative"
            onMouseOver={handleHover}
            onMouseOut={handleOutHover}
          >
            <div className="ring-offset-3 w-12 cursor-pointer rounded-full ring ring-blue-700 ring-offset-base-100">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
            </div>

            {showProfile && (
              <div className="absolute right-0 top-12 z-10 w-36 rounded-md border border-gray-200 bg-white shadow-md">
                <ul className="py-2">
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    <Link to={"/influencer/profile"}>Profile</Link>
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </li>
                  <li
                    onClick={profileLogout}
                    className="cursor-pointer px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
