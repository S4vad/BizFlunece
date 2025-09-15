const influencers = [
  // Fashion & Lifestyle (1–8)
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `Influencer ${i + 1}`,
    image: `/images/Fashion/${i + 1}.jpeg`,
    link: "#",
    influencerNiche: "Fashion & Lifestyle",
  })),

  // Banking & Finance (9–16)
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `Influencer ${i + 9}`,
    image: `/images/Banking/${i + 9}.jpeg`,
    link: "#",
    influencerNiche: "Banking & Finance",
  })),

  // Education (17–24)
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `Influencer ${i + 17}`,
    image: `/images/Educator/${i + 17}.jpeg` ,
    link: "#",
    influencerNiche: "Education",
  })),

  // Food & Beverages (25–32)
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `Influencer ${i + 25}`,
    image: `/images/Food/${i + 25}.jpeg`,
    link: "#",
    influencerNiche: "Food & Beverages",
  })),

  // Health (33–40)
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `Influencer ${i + 33}`,
    image: `/images/Health/${i + 33}.jpg`,
    link: "#",
    influencerNiche: "Health",
  })),

  // B2B & SaaS (41–48)
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `Influencer ${i + 41}`,
    image: `/images/B2b/${i + 41}.jpeg`,
    link: "#",
    influencerNiche: "B2B & SaaS",
  })),
];

export default influencers;
