
import { Card } from "@/components/ui/card";
import { Users, Database, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

const stats = [
  {
    label: "Total Patients",
    value: "1,234",
    icon: Users,
    trend: "+12%",
    color: "text-primary",
  },
  {
    label: "Departments",
    value: "8",
    icon: Database,
    trend: "Active",
    color: "text-accent",
  },
  {
    label: "Appointments",
    value: "48",
    icon: Calendar,
    trend: "Today",
    color: "text-secondary",
  },
];

const Dashboard = () => {
  const handleAddPatient = () => {
    toast.success("Patient form submitted!", {
      description: "Patient data would be saved to the database."
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hospital Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin</p>
        </div>
        <div className="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Patient</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Patient</SheetTitle>
                <SheetDescription>
                  Enter patient details and submit to add a new patient record.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <input id="name" className="rounded-md border p-2" placeholder="Enter patient name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="age" className="text-sm font-medium">Age</label>
                  <input id="age" type="number" className="rounded-md border p-2" placeholder="Enter age" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                  <select id="gender" className="rounded-md border p-2">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Button onClick={handleAddPatient} className="mt-4">Submit</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className={cn("text-sm mt-1", stat.color)}>{stat.trend}</p>
              </div>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium">Patient #{i}</p>
                  <p className="text-sm text-gray-600">Last visit: Today</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Department Status</h2>
          <div className="space-y-4">
            {["Cardiology", "Neurology", "Pediatrics"].map((dept) => (
              <div key={dept} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>{dept}</span>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-sm">Active</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
