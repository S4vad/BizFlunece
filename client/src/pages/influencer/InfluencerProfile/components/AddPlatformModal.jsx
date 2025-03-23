import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddPlatformModal({ isOpen, onClose, onAddPlatform }) {
  const [platform, setPlatform] = useState({
    platform: "",
    link: "",
    followers: "",
    unit: "K",
    engagement: "",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  // Handle input changes
  const handleInputChange = (field, value) => {
    setPlatform((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    let newErrors = {};

    if (!platform.platform) newErrors.platform = "Platform is required.";
    if (!platform.link )
      newErrors.link = "Enter a valid URL.";
    if (!platform.followers || isNaN(platform.followers) || Number(platform.followers) <= 0)
      newErrors.followers = "Enter a valid number of followers.";
    if (!platform.engagement || isNaN(platform.engagement) || Number(platform.engagement) < 0 || Number(platform.engagement) > 100)
      newErrors.engagement = "Engagement rate must be between 0 and 100%.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //checking count of errors
  };

  const handleSubmit = () => {
    if (!validate()) return; // Stop if validation fails

    const formattedFollowers = `${platform.followers}${platform.unit}`;
    const formattedEngagement = `${platform.engagement}%`;

    onAddPlatform({ ...platform, followers: formattedFollowers, engagement: formattedEngagement });
    setPlatform({ platform: "", link: "", followers: "", unit: "K", engagement: "" });
    setErrors({}); // Clear errors
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Platform</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Platform Selection */}
          <Select onValueChange={(value) => handleInputChange("platform", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          {errors.platform && <p className="text-red-500 text-sm">{errors.platform}</p>}

          {/* Link Input */}
          <Input
            placeholder="Link"
            value={platform.link}
            onChange={(e) => handleInputChange("link", e.target.value)}
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}

          {/* Followers Input with Unit Selection */}
          <div className="flex gap-2">
            <Input
              placeholder="Followers"
              value={platform.followers}
              onChange={(e) => handleInputChange("followers", e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <Select onValueChange={(value) => setPlatform((prev) => ({ ...prev, unit: value }))} value={platform.unit}>
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="K">K</SelectItem>
                <SelectItem value="M">M</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.followers && <p className="text-red-500 text-sm">{errors.followers}</p>}

          {/* Engagement Rate Input */}
          <Input
            placeholder="Engagement Rate (%)"
            value={platform.engagement}
            onChange={(e) => handleInputChange("engagement", e.target.value.replace(/[^0-9.]/g, ""))}
          />
          {errors.engagement && <p className="text-red-500 text-sm">{errors.engagement}</p>}

          {/* Submit Button */}
          <Button onClick={handleSubmit}>Add Platform</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
