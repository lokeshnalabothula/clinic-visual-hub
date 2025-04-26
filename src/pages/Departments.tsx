
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";

interface Department {
  id: number;
  name: string;
  head: string;
  staff: number;
  status: "Active" | "Inactive";
}

const initialDepartments: Department[] = [
  { id: 1, name: "Cardiology", head: "Dr. Smith", staff: 15, status: "Active" },
  { id: 2, name: "Neurology", head: "Dr. Johnson", staff: 12, status: "Active" },
  { id: 3, name: "Pediatrics", head: "Dr. Williams", staff: 10, status: "Active" },
  { id: 4, name: "Orthopedics", head: "Dr. Brown", staff: 8, status: "Active" },
];

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [deptName, setDeptName] = useState("");
  const [deptHead, setDeptHead] = useState("");
  const [deptStaff, setDeptStaff] = useState("");

  const handleAddDepartment = () => {
    if (!deptName || !deptHead || !deptStaff) {
      toast.error("Please fill all fields");
      return;
    }

    const newDepartment: Department = {
      id: departments.length ? Math.max(...departments.map(d => d.id)) + 1 : 1,
      name: deptName,
      head: deptHead,
      staff: parseInt(deptStaff),
      status: "Active"
    };

    setDepartments([...departments, newDepartment]);
    setDeptName("");
    setDeptHead("");
    setDeptStaff("");
    toast.success("Department added successfully!");
  };

  const toggleDepartmentStatus = (id: number) => {
    setDepartments(departments.map(dept => {
      if (dept.id === id) {
        const newStatus = dept.status === "Active" ? "Inactive" : "Active";
        return { ...dept, status: newStatus };
      }
      return dept;
    }));
    toast.success("Department status updated!");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-600">Manage hospital departments</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button><Plus className="mr-2" /> Add Department</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Department</SheetTitle>
              <SheetDescription>
                Enter department details to create a new department.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Department Name</label>
                <input 
                  id="name" 
                  className="rounded-md border p-2" 
                  placeholder="Enter department name" 
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="head" className="text-sm font-medium">Department Head</label>
                <input 
                  id="head" 
                  className="rounded-md border p-2" 
                  placeholder="Enter department head" 
                  value={deptHead}
                  onChange={(e) => setDeptHead(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="staff" className="text-sm font-medium">Staff Count</label>
                <input 
                  id="staff" 
                  type="number" 
                  className="rounded-md border p-2" 
                  placeholder="Enter staff count" 
                  value={deptStaff}
                  onChange={(e) => setDeptStaff(e.target.value)}
                />
              </div>
              <Button onClick={handleAddDepartment} className="mt-4">Submit</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{dept.name}</h3>
                  <p className="text-sm text-gray-600">Head: {dept.head}</p>
                </div>
              </div>
              <Button 
                variant={dept.status === "Active" ? "outline" : "default"}
                onClick={() => toggleDepartmentStatus(dept.id)}
                className={dept.status === "Active" ? "border-green-500 text-green-500" : ""}
              >
                {dept.status}
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <span>Staff: {dept.staff}</span>
              <span>ID: {dept.id}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
