import { useState } from "react";
import campaignData from "@/data/campaign";
import { FaClock, FaListUl, FaMoneyBillWave } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import StarIcon from '@mui/icons-material/Star';

export default function ListedCampaignPage() {
  return (
    <div className="min-h-screen space-y-6 bg-gray-100 p-8">
      {campaignData.map((item) => (
        <div
          key={item.id}
          className="w-full max-w-3xl rounded-2xl bg-white p-8"
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
                <CiLocationOn className="text-gray-500  fill-current mr-1" />
                {item.location}
              </div>
            </div>
            <img src={item.image} className="size-12 rounded-xl" alt="" />
          </div>

          <div className="md:flex items-center md:space-y-0 space-y-3 md:space-x-5 py-2">
            <div className="flex items-center text-sm text-gray-500">
              <FaListUl className="mr-2" />
              {item.targetAudience}
            </div>
            <span className="text-sm text-gray-500 md:block hidden">|</span>

            <div className="flex items-center text-sm text-gray-500">
              <FaMoneyBillWave className="mr-2" />
              {item.budget}.Rs
            </div>
            <span className="text-sm text-gray-500 md:block hidden">|</span>

            <div className="flex items-center text-sm text-gray-500">
              <FaClock className="mr-2" />
              {item.duration}min
            </div>
            <span className="text-sm text-gray-500 md:block hidden">|</span>

            <div className="flex items-center text-sm text-gray-500">
              <FaListUl className="mr-2 text-gray-500" />
              {item.platforms.join(", ")}
            </div>
            <span className="text-sm text-gray-500 md:block hidden">|</span>

            <div className="flex items-center text-sm text-gray-500">
              <FaListUl className="mr-2 text-gray-500" />
              {item.deliverables}
            </div>
          </div>

          <div className="pb-2 text-sm text-gray-400">
            <p>{item.description}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-200">
            <span>{item.dateAdded}</span>
            <span>Saved</span>
          </div>
        </div>
      ))}
    </div>
  );
}
