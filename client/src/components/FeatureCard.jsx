import { GiCardQueenClubs } from "react-icons/gi";
import { GiCardAceDiamonds } from "react-icons/gi";
import { GiCardKingClubs } from "react-icons/gi";
import { GiCardJackHearts } from "react-icons/gi";
const icons = [
  {
    icon: <GiCardQueenClubs className="fill-red-600 text-3xl" />,
  },
  {
    icon: <GiCardAceDiamonds className="fill-violet-600 text-3xl" />,
  },
  {
    icon: <GiCardJackHearts className="fill-pink-600 text-3xl" />,
  },
  {
    icon: <GiCardKingClubs className="fill-emerald-600 text-3xl" />,
  },
];
const FeatureCard = () => {
  return (
    <div className="px-4 py-8 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {[
          {
            title: "AI-Powered Influencer Matching",
            content:
              "Our proprietary algorithms analyze 50+ data points to create perfect brand-influencer marriages. Beyond follower counts, we evaluate audience psychographics, content authenticity, and historical campaign performance to ensure chemistry that converts.",
          },
          {
            title: "Agile Campaign Architecture",
            content:
              "We design campaigns that scale with your ambitions - from nano-influencer sprints to celebrity ambassador marathons. Our modular approach lets you test, learn, and expand successful concepts while maintaining brand consistency across platforms.",
          },
          {
            title: "360° Partnership Framework",
            content:
              "From contract negotiations to content compliance monitoring, we operationalize every partnership detail. Our legal-tech stack ensures IP protection while our dedicated relationship managers maintain pulse checks on campaign health.",
          },
          {
            title: "ROI Revelation Dashboard",
            content:
              "Track real impact through our granular analytics interface that maps influencer efforts to business outcomes. We quantify everything from sentiment shift to CAC reduction, transforming social buzz into boardroom-ready metrics.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="group flex min-h-[300px] flex-col rounded-2xl border border-solid border-gray-300 bg-white p-6 shadow-md transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl dark:border-gray-600 dark:bg-gray-800 md:min-h-[380px] md:p-8"
          >
            {/* Icon or Number Badge */}
            <div className="mb-4 flex items-center justify-between">
              {icons[index].icon}

              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>

            {/* Title */}
            <h3 className="mb-4 text-lg font-semibold leading-tight text-gray-900 dark:text-white md:text-xl">
              {feature.title}
            </h3>

            {/* Content */}
            <p className="flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
              {feature.content}
            </p>

            {/* Bottom decoration */}
            <div className="mt-6 border-t border-gray-100 pt-4 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:border-gray-700">
              <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <span className="dark:text-white">Learn more</span>
                <svg
                  className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1 dark:fill-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
