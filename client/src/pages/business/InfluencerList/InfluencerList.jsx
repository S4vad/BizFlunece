import { useEffect, useState } from "react";
import InfluencerCard from "./components/InfluencerCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function InfluencerList() {
  const { user } = useAuth();
  const [influencers, setInfluencers] = useState([]);
  const [favoriteInfluencers, setFavoriteInfluencers] = useState(new Set());
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return; 

    const fetchInfluencers = async () => {
      try {
        const { data } = await axios.get("/business/influencerlist");
        setInfluencers(data.data);
        setFilteredInfluencers(data.data);
      } catch (error) {
        console.log("Error fetching influencers", error);
        toast.error("Failed to load influencers");
      }
    };

     const fetchFavoriteInfluencers = async () => {
      try {
        const businessId = user.id;
        const { data } = await axios.get(
          `/business/favoriteInfluencers/${businessId}`,
        );
        const favIds = data.data || [];
        setFavoriteInfluencers(
          new Set(favIds.map((inf) => inf._id.toString())),
        );
      } catch (error) {
        console.log(
          "Error fetching influencers",
          error.response?.data || error.message,
        );
      }
    };

    fetchInfluencers();
    fetchFavoriteInfluencers();
  }, [user.id]);

  // Filter influencers based on search query and filters
  useEffect(() => {
    const filtered = influencers.filter((influencer) => {
      // Safe property access with optional chaining and nullish coalescing
      const name = influencer.name?.toLowerCase() ?? "";
      const category =
        influencer.influencerCategory?.join(" ")?.toLowerCase() ?? "";
      const bio = influencer.bio?.toLowerCase() ?? "";
      const platforms =
        influencer.platform?.map((p) => p.platform?.toLowerCase()).join(" ") ??
        "";

      // Search query matching
      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) ||
        category.includes(searchQuery.toLowerCase()) ||
        bio.includes(searchQuery.toLowerCase()) ||
        platforms.includes(searchQuery.toLowerCase());

      // Platform filter
      const matchesPlatform =
        selectedPlatform === "All Platforms" ||
        influencer.platform?.some((p) => p.platform === selectedPlatform);

      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories" ||
        influencer.influencerCategory?.includes(selectedCategory);

      return matchesSearch && matchesPlatform && matchesCategory;
    });

    setFilteredInfluencers(filtered);
  }, [searchQuery, selectedPlatform, selectedCategory, influencers]);

  // Get unique categories for dropdown
  const uniqueCategories = Array.from(
    new Set(influencers.flatMap((inf) => inf.influencerCategory || [])),
  ).filter(Boolean);

  const toggleFavorite = async (influencerId) => {
    try {
      if (favoriteInfluencers.has(influencerId)) {
        await axios.post("/business/removeFav", {
          influencerId,
          businessId: user.id,
        });
        setFavoriteInfluencers((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(influencerId);
          return newFavorites;
        });
        toast.success("Removed from favorites");
      } else {
        await axios.post("business/addFav", {
          influencerId,
          businessId: user.id,
        });
        setFavoriteInfluencers((prev) => new Set(prev).add(influencerId));
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

 return (
  <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* New Campaign Button */}
      <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-3">
        <button
          onClick={() => navigate("/business/createcampaign")}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          New Campaign
        </button>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">Find Influencers</h2>

        {influencers.length === 0 ? (
          <div className="rounded-lg bg-gray-100 p-8 text-center">
            <p className="text-gray-500 text-lg font-medium">
              No influencers are available yet.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Once influencers sign up, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Search + Filters */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* Search Input */}
              <div className="col-span-1 md:col-span-2">
                <input
                  type="text"
                  placeholder="Search by name, category, bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Platform Filter */}
              <select
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option>All Platforms</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Twitter</option>
              </select>

              {/* Category Filter */}
              <select
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredInfluencers.length} of {influencers.length} influencers
            </div>

            {/* Influencer Cards */}
            {filteredInfluencers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredInfluencers.map((influencer) => (
                  <InfluencerCard
                    key={influencer._id}
                    influencer={influencer}
                    isFavorite={favoriteInfluencers.has(influencer._id)}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-gray-100 p-8 text-center">
                <p className="text-gray-500">
                  No influencers match your search criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPlatform("All Platforms");
                    setSelectedCategory("All Categories");
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

}
