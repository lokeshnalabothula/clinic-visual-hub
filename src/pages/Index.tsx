
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
