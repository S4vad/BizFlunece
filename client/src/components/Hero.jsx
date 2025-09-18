import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-10 md:py-16">
      {/* Top Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
        <div className="group relative">
          <img
            className="h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-white/50 transition-all duration-300 group-hover:ring-indigo-300 group-hover:shadow-xl sm:h-28 sm:w-28 md:h-36 md:w-36"
            src="/images/59ba684d-7095-4729-b987-d088453e6e5d-removebg-preview.jpg"
            alt="Influencer"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>

        <motion.div
          className="relative h-24 w-24 rounded-s-full rounded-t-full bg-gradient-to-br from-gray-900 to-black shadow-xl sm:h-32 sm:w-32 md:h-40 md:w-40"
          animate={{ rotateY: [0, 180, 180, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 1],
          }}
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-s-full rounded-t-full"
            animate={{ rotateY: [0, -180, -180, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
              times: [0, 0.2, 0.4, 0.6, 1],
            }}
          >
            <p className="text-xs font-semibold text-gray-200 sm:text-sm">
              Active Influencers
            </p>
            <p className="text-xs font-extrabold text-white sm:text-sm">422</p>
          </motion.div>
        </motion.div>

        <div className="group relative">
          <img
            className="h-24 w-20 rounded-full object-cover shadow-lg ring-2 ring-white/50 transition-all duration-300 group-hover:ring-purple-300 group-hover:shadow-xl sm:h-32 sm:w-28 md:h-40 md:w-36"
            src="/images/th (1)-removebg-preview.jpg"
            alt="Influencer"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="mt-2 grid grid-cols-3 sm:mt-3">
        <div className="group relative">
          <img
            className="h-28 w-28 rounded-bl-2xl rounded-br-[4rem] rounded-tl-2xl rounded-tr-2xl object-cover shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 sm:h-36 sm:w-36 sm:rounded-br-[6rem] md:h-44 md:w-44 md:rounded-br-[8rem]"
            src="/images/Carrymannati.jpeg"
            alt="Influencer"
          />
          <div className="absolute inset-0 rounded-bl-2xl rounded-br-[4rem] rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-br-[6rem] md:rounded-br-[8rem]"></div>
        </div>
        <div></div>

        <div className="h-20 w-20 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-[4rem] bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:h-26 sm:w-26 sm:rounded-tr-[6rem] md:h-32 md:w-32 md:rounded-tr-[9rem]"></div>
      </div>

      {/* Bottom Row */}
      <div className="-mt-6 flex gap-4 sm:-mt-8 sm:gap-6 md:-mt-10 md:gap-8">
        <motion.div
          className="relative h-24 w-24 rounded-r-full rounded-t-full bg-gradient-to-br from-emerald-300 to-green-400 shadow-xl sm:h-32 sm:w-32 md:h-40 md:w-40"
          animate={{ rotateY: [0, 0, 0, 180, 180, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
          }}
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-r-full rounded-t-full"
            animate={{ rotateY: [0, 0, 0, -180, -180, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
              times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
            }}
          >
            <p className="text-xs font-semibold text-gray-800 sm:text-sm">
              Active Campaigns
            </p>
            <p className="text-xs font-extrabold text-gray-900 sm:text-sm">582</p>
          </motion.div>
        </motion.div>

        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-400 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:h-20 sm:w-20 md:h-24 md:w-24"></div>

        {/* Decorative Elements */}
        <div className="absolute left-20 top-8 hidden h-4 w-4 rounded-full border border-gray-800 shadow-sm dark:border-indigo-400 dark:bg-indigo-900/50 sm:left-32 sm:top-12 sm:h-5 sm:w-5 md:left-48 md:top-16 lg:block md:h-6 md:w-6 md:border-4"></div>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width="60"
          height="60"
          className="absolute bottom-32 right-24 hidden drop-shadow-md sm:bottom-44 sm:right-36 sm:h-20 sm:w-20 md:bottom-60 md:right-56 lg:block md:h-28 md:w-28"
        >
          <polygon
            points="
    100,0 
    115,70 
    150,50 
    120,100 
    200,100 
    120,115 
    150,150 
    115,130 
    100,200 
    85,130 
    50,150 
    80,115 
    0,100 
    80,100 
    50,50 
    85,70"
            className="stroke-gray-800 dark:stroke-indigo-400"
            fill="none"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute bottom-12 right-24 hidden h-4 w-4 rotate-45 border border-gray-800  shadow-sm dark:border-purple-400 dark:bg-purple-900/50 sm:bottom-16 sm:right-36 sm:h-5 sm:w-5 md:bottom-24 md:right-56 lg:block md:h-6 md:w-6 md:border-4"></div>
      </div>
    </div>
  );
}