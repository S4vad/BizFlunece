import { useEffect, useState } from "react";
import { FaClock, FaListUl, FaMoneyBillWave } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import toast from "react-hot-toast";
import { getUserFromStorage } from "@/utils/LocalStorage";
import { useNavigate } from "react-router-dom";

export default function CampaignCard({ item, handleCard }) {
  const [bookmark, setBookmark] = useState(false);
  const user = getUserFromStorage();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Campaign item data:", item);
    const fetchBookmarkStatus = async () => {
      try {
        const res = await axios.get("/influencer/is-bookmarked", {
          params: {
            campaignId: item._id,
            userId: user.id,
          },
        });
        setBookmark(res.data.bookmarked);
      } catch (error) {
        console.log("Error checking bookmark status", error);
      }
    };

    fetchBookmarkStatus();
  }, [item._id, user.id]);

  const handleBookmark = async () => {
    try {
      if (bookmark) {
        await axios.post("/influencer/remove-bookmark", {
          campaignId: item._id,
          userId: user.id,
        });
        toast.success("Removed from bookmark");
        setBookmark(false);
      } else {
        await axios.post("/influencer/add-bookmark", {
          campaignId: item._id,
          userId: user.id,
        });
        toast.success("Added to bookmark");
        setBookmark(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating bookmark");
    }
  };

  const handleProfile = async () => {
    try {
      navigate("/business/profile", {
        state: { businessId: item.businessId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-full max-w-2xl cursor-pointer rounded-2xl bg-white p-8"
      onClick={() => handleCard(item._id)}
    >
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
        <img
          src={item.companyImage}
          onClick={(e) => {
            e.stopPropagation();
            handleProfile();
          }}
          className="size-12 rounded-xl"
          alt=""
        />
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
        <div onClick={handleBookmark} className="cursor-pointer">
          {bookmark ? (
            <BookmarkIcon className="!size-4 text-blue-500" />
          ) : (
            <BookmarkBorderIcon className="!size-4 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
