import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddPlatformModal({ isOpen, onClose, onAddPlatform }) {
  const [platform, setPlatform] = useState({
    platform: "",
    link: "",
    followers: "",
    engagement: "",
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setPlatform((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onAddPlatform(platform); 
    setPlatform({ platform: "", link: "", followers: "", engagement: "" }); // Clear input fields
    onClose(); 
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Platform</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Platform Name"
            value={platform.platform}
            onChange={(e) => handleInputChange("platform", e.target.value)}
          />
          <Input
            placeholder="Link"
            value={platform.link}
            onChange={(e) => handleInputChange("link", e.target.value)}
          />
          <Input
            placeholder="Followers"
            value={platform.followers}
            onChange={(e) => handleInputChange("followers", e.target.value)}
          />
          <Input
            placeholder="Engagement Rate"
            value={platform.engagement}
            onChange={(e) => handleInputChange("engagement", e.target.value)}
          />
          <Button onClick={handleSubmit}>Add Platform</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}