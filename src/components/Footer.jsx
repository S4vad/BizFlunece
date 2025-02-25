import { FiMail } from "react-icons/fi"; 
import { MdWifiCalling3 } from "react-icons/md";
import { ImGithub } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="mt-30 min-h-[450px] w-full overflow-hidden rounded-t-[3rem] bg-[#151515]">
      <div className="flex-row md:flex space-y-16 md:space-y-0 md:gap-16 md:px-36 pt-16">
        <div>
          <div className="text-3xl font-bold text-indigo-600">BizFluenze</div>
          <p className="mt-5 w-80 text-[#FFFFFF91]">
            We are India’s Largest Influencer Marketing Agency with an
            influencer network in 16 countries including India. We work with
            700+ leading brands to transform their business through Content
            Driven Influencer Solutions across Social Media Platforms.
          </p>
          <div className="flex gap-5 p-4">
            <BsInstagram className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300 hover:bg-[#E4405F]" />
            <FaFacebookSquare className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300 hover:bg-[#1877F2]" />
            <ImGithub className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300 hover:bg-[#6e5494]" />

            <IoLogoYoutube className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300 hover:bg-[#FF0000]" />
            <BsLinkedin className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300 hover:bg-[#0077B5]" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex">
            <MdWifiCalling3 className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300" />
            <div className="ml-4">
              <div className="text-[#FFFFFF91]" >Have a question?</div>
              <div className="text-[#FFFFFF91]" > 8137872257</div>
            </div>
          </div>
          <div className="flex">
            <FiMail   className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300" />
            <div className="ml-4">
              <div className="text-[#FFFFFF91]" >For Business Enquireis</div>
              <div className="text-[#FFFFFF91]" > Broker@BizFluenze.com</div>
            </div>
          </div>
          <div className="flex">
            <FiMail className="h-10 w-10 rounded-full bg-[#333] fill-white p-2 transition duration-300" />
            <div className="ml-4">
              <div className="text-[#FFFFFF91]" >For Job Enquireis</div>
              <div className="text-[#FFFFFF91]" > BizFluenze@carrier.com</div>
            </div>
          </div>
        </div>

        {/* Marketing Solutions Section */}
        <div>
          <h2 className="text-lg font-bold text-white">Marketing Solutions</h2>
          <ul className="mt-2 space-y-2">
            <li className="text-[#FFFFFF91] transform-transition duration-500 hover:scale-105">YouTube Marketing</li>
            <li className="text-[#FFFFFF91] transform-transition duration-500 hover:scale-105">Instagram Marketing</li>
            <li className="text-[#FFFFFF91] transform-transition duration-500 hover:scale-105">Celebrity Marketing</li>
            <li className="text-[#FFFFFF91] transform-transition duration-500 hover:scale-105">Meme Marketing</li>
            <li className="text-[#FFFFFF91] transform-transition duration-500 hover:scale-105">Regional Influencer Marketing</li>
            <li className="text-[#FFFFFF91] transform-transition duration-500 hover:scale-105">Talent Representation</li>
          </ul>
        </div>

        {/* Office Locations Section */}
        <div>
          <h2 className="text-lg font-bold text-white">Bengaluru Office</h2>
          <p className="mt-2 w-72 text-[#FFFFFF91]">
            2nd floor, Workshaala Neo, 17/R, above Leon’s Grill Burger, Sector
            3, HSR Layout, Bengaluru, Karnataka – 560102
          </p>
          <h2 className="mt-4 text-lg font-bold text-white">Mumbai Office</h2>
          <p className="mt-2 w-72 text-[#FFFFFF91]">
            C206, Omkar Ananta, General Arun Kumar Vaidya Marg, Goregaon,
            Mumbai, Maharashtra – 400063
          </p>
        </div>
      </div>
      <div className="mt-10 w-full border-t-[0.5px] border-white"></div>
      <div className= "mt-8 text-[#FFFFFF91] text-center">@ 2025, All Rights Reserved</div>
    </div>
  );
};

export default Footer;
