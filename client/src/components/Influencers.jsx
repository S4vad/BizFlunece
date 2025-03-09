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
      <div className="md:flex grid grid-cols-3 items-center md:justify-center space-x-2 space-y-2 md:space-x-10 py-10 pt-20">
        {influencerNiche.map((niche, index) => (
          <div
            onClick={() => nicheClick(niche)}
            className={`cursor-pointer rounded-full border border-indigo-600 text-center px-1 py-1 md:px-3 md:py-2 text-sm md:text-lg text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white ${selectedNiche === niche ? "bg-indigo-600 text-white" : "text-indigo-600 hover:text-white"}`}
            key={index}
          >
            {niche}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4  gap-6 sm:px-16 md:px-36">
        {influencers.map((item, index) => (
          <a
            key={index}
            href={item.link}
            rel="noopener noreferrer"
            target="_blank"
            className="block transform overflow-hidden transition-transform "
          >
            <div className="md:h-64 md:w-64 w-34 h-34 overflow-hidden rounded-xl ">
              <img
                className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105 "
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
