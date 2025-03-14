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
      <div className="grid grid-cols-3 items-center space-x-2 space-y-2 py-10 pt-20 md:flex md:justify-center md:space-x-10">
        {influencerNiche.map((niche, index) => (
          <div
            key={index}
            onClick={() => nicheClick(niche)}
            className={`cursor-pointer rounded-full border dark:text-white dark:hover:border-none dark:border-white border-indigo-600 px-1 py-1 text-center text-sm text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white md:px-3 md:py-2 md:text-lg ${
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
      <div className="grid grid-cols-3 gap-6 sm:px-16 md:grid-cols-4 md:px-36">
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
                <div className="w-34 h-34 overflow-hidden rounded-xl md:h-64 md:w-64">
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </motion.a>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 md:col-span-4">
              No influencers found.
            </p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Influencers;
