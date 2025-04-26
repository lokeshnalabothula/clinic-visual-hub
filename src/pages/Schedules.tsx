
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";

interface Schedule {
  id: number;
  doctor: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
}

const initialSchedules: Schedule[] = [
  { id: 1, doctor: "Dr. Smith", department: "Cardiology", date: "2025-04-27", startTime: "09:00", endTime: "17:00" },
  { id: 2, doctor: "Dr. Johnson", department: "Neurology", date: "2025-04-27", startTime: "08:00", endTime: "16:00" },
  { id: 3, doctor: "Dr. Williams", department: "Pediatrics", date: "2025-04-28", startTime: "10:00", endTime: "18:00" },
];

const Schedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSchedule = () => {
    if (!doctor || !department || !date || !startTime || !endTime) {
      toast.error("Please fill all fields");
      return;
    }

    const newSchedule: Schedule = {
      id: schedules.length ? Math.max(...schedules.map(s => s.id)) + 1 : 1,
      doctor,
      department,
      date,
      startTime,
      endTime
    };

    setSchedules([...schedules, newSchedule]);
    setDoctor("");
    setDepartment("");
    setDate("");
    setStartTime("");
    setEndTime("");
    toast.success("Schedule added successfully!");
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
    toast.success("Schedule deleted successfully!");
  };

  // Group schedules by date for better organization
  const schedulesByDate = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.date]) {
      acc[schedule.date] = [];
    }
    acc[schedule.date].push(schedule);
    return acc;
  }, {} as Record<string, Schedule[]>);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Schedules</h1>
          <p className="text-gray-600">Manage doctor schedules</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button><Plus className="mr-2" /> Add Schedule</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Schedule</SheetTitle>
              <SheetDescription>
                Enter schedule details for a doctor.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="doctor" className="text-sm font-medium">Doctor</label>
                <input 
                  id="doctor" 
                  className="rounded-md border p-2" 
                  placeholder="Enter doctor name" 
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="department" className="text-sm font-medium">Department</label>
                <select 
                  id="department" 
                  className="rounded-md border p-2"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <input 
                  id="date" 
                  type="date" 
                  className="rounded-md border p-2" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startTime" className="text-sm font-medium">Start Time</label>
                  <input 
                    id="startTime" 
                    type="time" 
                    className="rounded-md border p-2" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="endTime" className="text-sm font-medium">End Time</label>
                  <input 
                    id="endTime" 
                    type="time" 
                    className="rounded-md border p-2" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleAddSchedule} className="mt-4">Submit</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-8">
        {Object.keys(schedulesByDate).map((date) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-primary" />
              <h2 className="font-semibold text-lg">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedulesByDate[date].map((schedule) => (
                <Card key={schedule.id} className="p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{schedule.doctor}</h3>
                      <p className="text-sm text-gray-600">{schedule.department}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteSchedule(schedule.id)}>Remove</Button>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
                    <Clock className="h-4 w-4" />
                    <span>{schedule.startTime} - {schedule.endTime}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedules;
