'use client';
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { format, isSameDay } from "date-fns"; 

export default function AddClass() {
    const [className, setClassName] = useState("");
    const [classCode, setClassCode] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [studentIDs, setStudentIDs] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [dates, setDates] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/users?role=student'); 
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                const data = await response.json();
                setStudents(data);
                setFilteredStudents(data);
            } catch (err) {
                console.error(err);
                setError("Error fetching students");
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const results = students.filter(student =>
            student.id.toString().includes(searchTerm) 
        );
        setFilteredStudents(results);
    }, [searchTerm, students]);

    const toggleStudentSelection = (studentId) => {
        setStudentIDs((prev) => {
            if (prev.includes(studentId)) {
                return prev.filter(id => id !== studentId); 
            } else {
                return [...prev, studentId]; 
            }
        });
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        const formattedDates = dates.map((date) => date.toISOString());

        try {
            const res = await fetch(`/api/classes/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ className, classCode, teacherID, studentIDs, dates: formattedDates }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("Class added successfully!");
                setClassName("");
                setClassCode("");
                setTeacherID("");
                setStudentIDs([]);
                setDates([]);
                setSearchTerm(""); 
            } else {
                setError(data.error || "Failed to add class");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    const handleDateSelect = (selectedDates) => {
        if (!Array.isArray(selectedDates)) {
            console.error("Expected an array of dates, but got:", selectedDates);
            return;
        }
        const validDates = selectedDates.filter(date => !isNaN(new Date(date).getTime()));
        setDates(validDates);
    };
    
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Add New Class</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddClass} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="className">Class Name</Label>
                        <Input
                            id="className"
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                        />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="classCode">Class Code</Label>
                        <Input
                            id="classCode"
                            type="text"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                        />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="teacherID">Teacher ID</Label>
                        <Input
                            id="teacherID"
                            type="text"
                            value={teacherID}
                            onChange={(e) => setTeacherID(e.target.value)}
                        />
                    </div>
                    <Separator />
                    
                    <div className="space-y-2">
                        <Label htmlFor="studentIDs">Student IDs</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left"
                                >
                                    {studentIDs.length > 0
                                        ? `Selected: ${studentIDs.join(", ")}`
                                        : "Select Students"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <Input
                                    type="text"
                                    placeholder="Search by student ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mb-2"
                                />
                                <div className="space-y-2">
                                    {filteredStudents.map(student => (
                                        <div key={student._id} className="flex items-center">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={studentIDs.includes(student.id)} 
                                                    onChange={() => toggleStudentSelection(student.id)} 
                                                    className="mr-2" 
                                                />
                                                <span>{student.id}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <p className="text-sm text-gray-500">Select students from the list above</p>
                    </div>

                    <Separator />
                    <div className="space-y-2">
                        <Label>Class Dates</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal whitespace-normal break-words"
                                >
                                    {dates.length
                                        ? dates
                                            .filter((date) => !isNaN(date.getTime())) 
                                            .map((date) => format(date, "PPP"))
                                            .join(", ")
                                        : "Pick dates"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="multiple"
                                    selected={dates}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-sm text-gray-500">Select date for the class</p>
                    </div>

                    <Separator />
                    <br />
                    <Button type="submit" className="w-full">Add Class</Button>
                </form>
                {success && (
                    <Alert className="mt-4" variant="success">
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert className="mt-4" variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
