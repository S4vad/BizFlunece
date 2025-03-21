import { useState } from "react";
import { FaClock, FaListUl, FaMoneyBillWave } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function CampaignCard({ item }) {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => setBookmark(!bookmark);

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white p-8">
      <div className="flex items-center justify-between space-y-1">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{item.title}</div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">{item.companyName}</div>
            <div className="flex items-center space-x-2">
              <StarIcon style={{ color: "yellow", fontSize: "16px" }} />
              <span className="text-sm text-gray-500">{item.rating}</span>
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm text-gray-500">{item.count}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CiLocationOn className="mr-1 fill-current text-gray-500" />
            {item.location}
          </div>
        </div>
        <img src={item.image} className="size-12 rounded-xl" alt="" />
      </div>

      <div className="items-center space-y-3 py-2 md:flex md:space-x-5 md:space-y-0">
        <div className="flex items-center text-sm text-gray-500">
          <FaListUl className="mr-2" />
          {item.targetAudience}
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <FaMoneyBillWave className="mr-2" />
          {item.budget}.Rs
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <FaClock className="mr-2" />
          {item.duration}min
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <FaListUl className="mr-2 text-gray-500" />
          {item.platforms.join(", ")}
        </div>
      </div>

      <div className="pb-2 text-sm text-gray-400">
        <p>{item.description}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-200">
        <span>{item.dateAdded}</span>
        <div onClick={handleBookmark}>
          {bookmark ? (
            <BookmarkIcon className="!size-4" />
          ) : (
            <BookmarkBorderIcon className="!size-4" />
          )}
        </div>
      </div>
    </div>
  );
}
