import { useTheme } from "@/components/darkmode/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="dark:!text-white   dark:bg-[#171E2C] dark:border-[#0D1120] dark:hover:bg-[#1E2738] dark:hover:border-[#131A28]"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] dark:!text-white  " />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] dark:!text-white  " />
      )}
      <span className="sr-only dark:!text-white  ">Toggle theme</span>
    </Button>
  );

  
}