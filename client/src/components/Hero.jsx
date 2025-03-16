import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center px-10 py-16">
      {/* Top Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="relative">
          <img
            className="h-36 w-36 rounded-full object-cover"
            src="/images/59ba684d-7095-4729-b987-d088453e6e5d-removebg-preview.jpg"
            alt=""
          />
        </div>

        <motion.div
          className="relative flex h-40 w-40 flex-col items-center justify-center rounded-s-full rounded-t-full bg-black"
          animate={{ rotateY: [0, 180, 180, 360] }} //rotate 180 and stop and 360
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
            repeatDelay: 3,
            delay: 1,
          }}
        >
          <p className="text-sm font-bold text-white">Active Influencers</p>
          <p className="text-sm font-extrabold text-white">422</p>
        </motion.div>

        <div className="relative">
          <img
            className="h-40 w-36 rounded-full object-cover"
            src="/images/th (1)-removebg-preview.jpg"
            alt=""
          />
        </div>
      </div>

      {/* Middle Row */}
      <div className="mt-3 grid grid-cols-3">
        <div className="relative">
          <img
            className="object- h-44 w-44 rounded-bl-2xl rounded-br-[8rem] rounded-tl-2xl rounded-tr-2xl"
            src="/images/Carrymannati.jpeg"
            alt=""
          />
        </div>
        <div></div>

        <div className="h-32 w-32 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-[9rem] bg-yellow-400"></div>
      </div>

      {/* Bottom Row */}
      <div className="-mt-10 flex gap-8">
        <motion.div
          className="animate-rotate-x0 relative flex h-40 w-40 flex-col items-center justify-center rounded-r-full rounded-t-full bg-green-300"
          animate={{ rotateY: [0, 180, 180, 360] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            repeatDelay: 2,
            ease: "linear",
            delay: 3,
          }}
        >
          <p className="text-sm font-bold text-black">Active Campaigns</p>
          <p className="text-sm font-extrabold text-black">582</p>
        </motion.div>

        <div className="h-24 w-24 rounded-full bg-red-400"></div>

        {/* Decorative Elements */}

        <div className="absolute left-48 top-16 h-6 w-6 rounded-full border-4 border-black dark:border-white"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width="110"
          height="110"
          className="absolute bottom-60 right-56  "
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
             className="stroke-black dark:stroke-white"
            fill="none"
            strokeWidth="5"
          />
        </svg>

        <div className="border- absolute bottom-24 right-56 h-6 w-6 rotate-45 border-4 border-solid border-black dark:border-white"></div>
      </div>
    </div>
  );
}
