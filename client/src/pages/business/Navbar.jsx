import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/darkmode/ModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm dark:bg-night-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-3xl font-bold text-indigo-600">BizFluenze</div>
        <div className="text-md hidden gap-x-12 font-medium text-gray-700 md:flex">
          <div className="cursor-pointer transition duration-300 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500">
            <Link to="/business/dashboard">Dashboard</Link>
          </div>
          <div className="cursor-pointer transition duration-300 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500">
            <Link to="/business/influencerList">Influencers</Link>
          </div>
        </div>
        <ModeToggle />
        
      </div>
    </nav>
  );
}
