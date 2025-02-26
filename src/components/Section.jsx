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
      className={` md:flex flex-col md:flex-row md:items-center md:space-y-0 space-y-7 justify-center gap-14 ${
        index % 2 === 0 ? "" : "md:flex-row-reverse"
      }`}
    >
      <div className="md:w-1/2">
        <div className=" text-[32px] font-semibold  text-[#2652E9] font-[certia,sans-serif]">
          {item.title}
        </div>
        <div className="w-[600px]  text-[15.55px] font-[540] tracking-wider font-sans leading-[1.7rem] mt-10  text-gray-900">{item.content}</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 200, filter: "blur(5px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <img className="size-80 rounded-3xl" src={`images/${item.image}`} />
      </motion.div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="mx-auto space-y-40 px-6 py-16">
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