import influencers from "../data/influencersData";
import { useState } from "react";

const Influencers = () => {
  const influencerNiche = [
    "Fashion & Lifestyle",
    "Banking & Finance",
    "Education",
    "Food & Beverages",
    "Health",
    "B2B & SaaS",
  ];
  const [selectedNiche, setSelectedNiche] = useState(null);
  function nicheClick(niche) {
    setSelectedNiche(niche === selectedNiche ? null : niche);
  }
  return (
    <>
      <div className="flex items-center justify-center space-x-10 py-10 pt-20">
        {influencerNiche.map((niche, index) => (
          <div
            onClick={() => nicheClick(niche)}
            className={`cursor-pointer rounded-full border border-indigo-600 px-3 py-2 text-lg text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white ${selectedNiche === niche ? "bg-indigo-600 text-white" : "text-indigo-600 hover:text-white"}`}
            key={index}
          >
            {niche}
          </div>
        ))}
      </div>

      <div className="md:gird-col-3 lg:grid-col-4 grid grid-cols-4 gap-6 px-36">
        {influencers.map((item, index) => (
          <a
            key={index}
            href={item.link}
            rel="noopener noreferrer"
            target="_blank"
            className="block transform overflow-hidden transition-transform hover:scale-105"
          >
            <div className="h-72 w-72 overflow-hidden rounded-xl ">
              <img
                className="h-full w-full    object-cover transition-transform duration-500 ease-in-out hover:scale-110 "
                src={item.image}
                alt={item.name}
              />
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default Influencers;
