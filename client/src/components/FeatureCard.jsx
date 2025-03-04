const FeatureCard = () => {
  return (
    <div className="flex justify-between space-x-10 px-32">
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
          className="flex-1 space-y-5 rounded-2xl border border-solid border-gray-300 px-8 py-10 shadow-gray-500 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)] min-h-[400px] flex flex-col justify-between"
        >
          <h1 className="text-xl ">{feature.title}</h1>
          <p className="flex-grow">{feature.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;
