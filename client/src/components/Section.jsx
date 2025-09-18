import { data } from "../data/data";
import { motion } from "framer-motion";
import { useRef } from "react";
import PropTypes from 'prop-types';
import { useInView } from "framer-motion";

function SectionItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div 
      ref={ref}
      className={`flex flex-col lg:flex-row lg:items-center space-y-7 lg:space-y-0 justify-center gap-8 lg:gap-14 ${
        index % 2 === 0 ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className="lg:w-1/2 px-4 lg:px-0">
        <div className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#2652E9] font-[certia,sans-serif]">
          {item.title}
        </div>
        <div className="max-w-full lg:w-[600px] text-sm sm:text-base lg:text-[15.55px] font-[540] tracking-wider font-sans leading-[1.7rem] mt-6 lg:mt-10 dark:text-white text-gray-900">
          {item.content}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 200, filter: "blur(5px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        className="flex justify-center lg:justify-start"
      >
        <img className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl object-cover" src={`images/${item.image}`} />
      </motion.div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="mx-auto space-y-20 lg:space-y-40 px-4 sm:px-6 py-16">
      {data.map((item, index) => (
        <SectionItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}

SectionItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};