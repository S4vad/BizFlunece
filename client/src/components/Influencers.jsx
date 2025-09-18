import influencers from "../data/influencersData";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Influencers = () => {
  const influencerNiche = [
    "Fashion & Lifestyle",
    "Banking & Finance",
    "Education",
    "Food & Beverages",
    "Health",
    "B2B & SaaS",
  ];

  // Set default state to "Education"
  const [selectedNiche, setSelectedNiche] = useState("Education");

  function nicheClick(niche) {
    setSelectedNiche(niche);
  }

  // Filter influencers based on selected niche
  const filteredInfluencers = influencers.filter(
    (item) => item.influencerNiche === selectedNiche,
  );

  return (
    <>
      {/* Niche selection buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-2 py-10 pt-20 px-4 lg:justify-center lg:space-x-10">
        {influencerNiche.map((niche, index) => (
          <div
            key={index}
            onClick={() => nicheClick(niche)}
            className={`cursor-pointer rounded-full border dark:text-white dark:hover:border-none dark:border-white border-indigo-600 px-2 sm:px-3 lg:px-3 py-1 sm:py-2 lg:py-2 text-center text-xs sm:text-sm lg:text-lg text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white ${
              selectedNiche === niche
                ? "bg-indigo-600 text-white dark:border-indigo-800"
                : "text-indigo-600 hover:text-white darK:border"
            }`}
          >
            {niche}
          </div>
        ))}
      </div>

      {/* Display selected niche influencers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
        <AnimatePresence mode="wait">
          {filteredInfluencers.length > 0 ? (
            filteredInfluencers.map((item, index) => (
              <motion.a
                key={item.name + index}
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
                initial={{ opacity: 0, scale: 0.3, x: -50, y: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 50, y: 50 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="block transform overflow-hidden transition-transform"
              >
                <div className="w-full aspect-square overflow-hidden rounded-xl">
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </motion.a>
            ))
          ) : (
            <p className="col-span-2 sm:col-span-3 lg:col-span-4 text-center text-gray-500">
              No influencers found.
            </p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Influencers;