
import { Hospital, Database, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const menuItems = [
  { icon: Hospital, label: "Dashboard", href: "/" },
  { icon: Database, label: "Patient Records", href: "/patients" },
  { icon: Users, label: "Departments", href: "/departments" },
  { icon: Calendar, label: "Schedules", href: "/schedules" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (href === "/") {
      navigate(href);
    } else {
      toast.info(`This page (${href}) hasn't been implemented yet.`, {
        description: "Coming soon!"
      });
    }
  };

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Hospital className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-gray-800">MedManager</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.href)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-primary/5 rounded-lg transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
