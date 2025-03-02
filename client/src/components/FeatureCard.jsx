const FeatureCard = () => {
  return (
    <div className="flex justify-between space-x-6 px-48">
      <div className="transform-transition space-y-5 rounded-2xl border border-solid border-gray-300 px-8 pb-32 pt-20 shadow-gray-500 transition-all duration-700 ease-in-out hover:-translate-y-8 hover:scale-y-105 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
        <h1 className="text-xl">
          AI-Powered <br></br>Influencer Matching
        </h1>
        <p>
          Our proprietary algorithms analyze 50+ data points to create perfect
          brand-influencer marriages. Beyond follower counts, we evaluate
          audience psychographics, content authenticity, and historical campaign
          performance to ensure chemistry that converts.
        </p>
      </div>{" "}
      <div className="transform-transition space-y-5 rounded-2xl border border-solid border-gray-300 px-8 pb-32 pt-20 shadow-gray-500 transition-all duration-700 ease-in-out hover:-translate-y-8 hover:scale-y-105 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
        <h1 className="text-xl">Agile Campaign Architecture</h1>
        <p>
          We design campaigns that scale with your ambitions - from
          nano-influencer sprints to celebrity ambassador marathons. Our modular
          approach lets you test, learn, and expand successful concepts while
          maintaining brand consistency across platforms.
        </p>
      </div>
      <div className="transform-transition space-y-5 rounded-2xl border border-solid border-gray-300 px-8 pb-32 pt-20 shadow-gray-500 transition-all duration-700 ease-in-out hover:-translate-y-8 hover:scale-y-105 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
        <h1 className="text-xl">360° Partnership Framework</h1>
        <p>
          From contract negotiations to content compliance monitoring, we
          operationalize every partnership detail. Our legal-tech stack ensures
          IP protection while our dedicated relationship managers maintain pulse
          checks on campaign health
        </p>
      </div>
      <div className="transform-transition space-y-5 rounded-2xl border border-solid border-gray-300 px-8 pb-32 pt-20 shadow-gray-500 transition-all duration-700 ease-in-out hover:-translate-y-8 hover:scale-y-105 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
        <h1 className="text-xl">ROI Revelation Dashboard</h1>
        <p>
          Track real impact through our granular analytics interface that maps
          influencer efforts to business outcomes. We quantify everything from
          sentiment shift to CAC reduction, transforming social buzz into
          boardroom-ready metrics.
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
