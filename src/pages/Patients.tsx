
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
}

const initialPatients: Patient[] = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", lastVisit: "2025-04-20" },
  { id: 2, name: "Sarah Johnson", age: 32, gender: "Female", lastVisit: "2025-04-18" },
  { id: 3, name: "Robert Williams", age: 56, gender: "Male", lastVisit: "2025-04-15" },
];

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");

  const handleAddPatient = () => {
    if (!patientName || !patientAge || !patientGender) {
      toast.error("Please fill all fields");
      return;
    }
    
    const newPatient: Patient = {
      id: patients.length ? Math.max(...patients.map(p => p.id)) + 1 : 1,
      name: patientName,
      age: parseInt(patientAge),
      gender: patientGender,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    
    setPatients([...patients, newPatient]);
    setPatientName("");
    setPatientAge("");
    setPatientGender("");
    toast.success("Patient added successfully!");
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast.success("Patient deleted successfully!");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
          <p className="text-gray-600">Manage patient information</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button><Plus className="mr-2" /> Add Patient</Button>
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
                <input 
                  id="name" 
                  className="rounded-md border p-2" 
                  placeholder="Enter patient name" 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="age" className="text-sm font-medium">Age</label>
                <input 
                  id="age" 
                  type="number" 
                  className="rounded-md border p-2" 
                  placeholder="Enter age" 
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                <select 
                  id="gender" 
                  className="rounded-md border p-2"
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Button onClick={handleAddPatient} className="mt-4">Submit</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Age</th>
                  <th className="text-left py-3 px-4">Gender</th>
                  <th className="text-left py-3 px-4">Last Visit</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{patient.id}</td>
                    <td className="py-3 px-4">{patient.name}</td>
                    <td className="py-3 px-4">{patient.age}</td>
                    <td className="py-3 px-4">{patient.gender}</td>
                    <td className="py-3 px-4">{patient.lastVisit}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePatient(patient.id)}><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Patients;
