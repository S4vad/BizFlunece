import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/darkmode/ModeToggle";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewIcon from "@mui/icons-material/GridView";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <nav className="sticky top-0  bg-white shadow-sm dark:bg-night-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 ">
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
        <div className="flex items-center gap-10">
          <div
            className="relative cursor-pointer"
            onMouseOver={handleHover}
            onMouseOut={handleOutHover}
          >
            <Avatar className="ring ring-blue-700 ring-offset-2">
              <AvatarImage
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {showProfile && (
              <div className="absolute right-0 top-10 z-10 h-40 w-36 rounded-md border border-gray-200 bg-white shadow-md">
                <ul className="py-2 text-sm">
                  <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                    <img
                      src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                      alt="Login"
                      className="!size-[20px]"
                    />
                    <Link to={"/influencer/profile"}>Profile</Link>
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => navigate("/influencer/dashboard")}
                  >
                    <GridViewIcon className="mr-2 !size-4" />
                    Dashboard
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => navigate("/influencer/bookmark")}
                  >
                    <BookmarksIcon className="mr-2 !h-4 !w-4" />
                    Bookmarks
                  </li>
                  <li
                    onClick={profileLogout}
                    className="cursor-pointer px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <LogoutIcon className="mr-2 !size-4" />
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
