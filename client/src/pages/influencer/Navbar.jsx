import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/darkmode/ModeToggle";
import { useEffect, useState } from "react";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewIcon from "@mui/icons-material/GridView";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { MessageCircleMore } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const { user, logout } = useAuth();

  const api = user.isBusiness ? "/business/company_profile" : "/profile";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${api}/${user.id}`);
        setProfile(data.data);
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    if (user) fetchProfile();
  }, []);

  const handleHover = () => setShowProfile(true);
  const handleOutHover = () => setShowProfile(false);

  const profileLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="dark:bg-night-50 sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-3xl font-bold text-indigo-600 hover:cursor-pointer">
          <Link
            to={`/${user.isBusiness ? "business" : "influencer"}/dashboard`}
          >
            BizFluenze
          </Link>
        </div>

        <div className="text-md hidden gap-x-12 font-medium text-gray-700 md:flex">
          <Link
            to={`/${user.isBusiness ? "business" : "influencer"}/dashboard`}
            className="group relative text-white dark:text-white"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-500">
              Dashboard
            </span>
            <span className="absolute bottom-0 left-1/2 h-px w-0 origin-center translate-x-[-50%] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Influencers / Campaigns Link */}
          {user.isBusiness ? (
            <Link
              to="/business/influencerList"
              className="group relative cursor-pointer transition dark:text-white"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-500">
                Influencers
              </span>
              <span className="absolute bottom-0 left-1/2 h-px w-0 origin-center translate-x-[-50%] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ) : (
            <Link
              to="/influencer/campaignlist"
              className="group relative cursor-pointer transition dark:text-white"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-500">
                Campaigns
              </span>
              <span className="absolute bottom-0 left-1/2 h-px w-0 origin-center translate-x-[-50%] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-10">
          {/* Chat Icon and List */}
          <div className="relative">
            <button
              className="group flex items-center gap-1 transition dark:text-white"
              onClick={() =>
                navigate(
                  `/${user.isBusiness ? "business" : "influencer"}/messages`,
                )
              }
            >
              <MessageCircleMore className="h-5 w-5 stroke-indigo-600 transition group-hover:stroke-indigo-400 dark:group-hover:stroke-indigo-400" />
              <span className="group relative">
                <p className="relative z-10 text-sm text-indigo-600 transition group-hover:text-indigo-400 dark:group-hover:text-indigo-400">
                  Messages
                </p>
                <span className="absolute bottom-0 left-1/2 h-px w-0 origin-center translate-x-[-50%] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          </div>

          <div
            className="relative cursor-pointer"
            onMouseOver={handleHover}
            onMouseOut={handleOutHover}
          >
            <Avatar className="ring ring-blue-700 ring-offset-2">
              <AvatarImage src={profile?.image || "image.png"} alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {showProfile && (
              <div className="absolute right-0 top-10 z-10 h-40 w-36 rounded-md border border-gray-200 bg-white shadow-md">
                <ul className="py-2 text-sm">
                  <li
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      navigate(
                        `/${user.isBusiness ? "business" : "influencer"}/profile`,
                      )
                    }
                  >
                    <img
                      src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                      alt="Login"
                      className="!size-[20px]"
                    />
                    Profile
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      navigate(
                        `/${user.isBusiness ? "business" : "influencer"}/dashboard`,
                      )
                    }
                  >
                    <GridViewIcon className="mr-2 !size-4" />
                    Dashboard
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                      navigate(
                        `/${user.isBusiness ? "business/favorite" : "influencer/bookmark"}`,
                      )
                    }
                  >
                    <BookmarksIcon className="mr-2 !h-4 !w-4" />
                    {user.isBusiness ? "Favorite" : "Bookmarks"}
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
