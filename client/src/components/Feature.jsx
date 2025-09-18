import React from 'react'
import { motion } from "framer-motion";
import { Users, MessageSquare, Search, Target, Star, TrendingUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: "Influencer Discovery",
    description: "Browse and discover talented influencers across different niches and follower ranges to find the perfect match for your brand.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    status: "Available"
  },
  {
    title: "Real-Time Messaging",
    description: "Connect directly with influencers through our integrated messaging system for seamless communication and collaboration.",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    status: "Available"
  },
  {
    title: "Campaign Creation",
    description: "Create detailed campaign briefs, set requirements, and manage multiple campaigns from one centralized dashboard.",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    status: "Available"
  },
  {
    title: "Profile Management",
    description: "Both businesses and influencers can create comprehensive profiles showcasing their work, achievements, and preferences.",
    icon: Users,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    status: "Available"
  },
  {
    title: "Smart Matching",
    description: "Advanced filtering and search capabilities to help businesses find influencers that align with their brand values and target audience.",
    icon: Star,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    status: "Coming Soon"
  },
  {
    title: "Performance Analytics",
    description: "Track campaign success with detailed analytics and performance metrics to measure ROI and engagement rates.",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    status: "Coming Soon"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const Feature = () => {
  const navigate=useNavigate();
  return (
    <div className="mx-auto mt-20 max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BizFluencer?
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive platform designed to simplify influencer marketing for businesses and creators alike.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isComingSoon = feature.status === "Coming Soon";
            
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={!isComingSoon ? "hover" : {}}
                className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                  isComingSoon ? 'opacity-80' : ''
                }`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isComingSoon 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                  }`}>
                    {feature.status}
                  </span>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-4">
                  {/* Icon */}
                  <motion.div
                    variants={!isComingSoon ? iconVariants : {}}
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} transition-colors duration-300`}
                  >
                    <IconComponent className={`h-6 w-6 ${feature.iconColor} transition-colors duration-300`} />
                  </motion.div>

                  {/* Title */}
                  <h3 className={`mb-3 text-lg font-semibold ${
                    isComingSoon 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                  } transition-colors duration-300`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative line for available features */}
                  {!isComingSoon && (
                    <div className="mt-4 h-0.5 w-0 bg-gradient-to-r group-hover:w-full transition-all duration-500 rounded-full opacity-0 group-hover:opacity-100" 
                         style={{ backgroundImage: `linear-gradient(to right, ${feature.color.replace('from-', '').replace(' to-', ', ')})` }} 
                    />
                  )}
                </div>

                {/* Subtle background pattern */}
                <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color.replace('from-', '').replace(' to-', ', ')})` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Marketing Strategy?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses and influencers who are already using BizFluencer to create successful partnerships and campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Start as Business
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg border border-indigo-200 dark:bg-gray-700 dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Join as Influencer
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
  )
}

export default Feature
