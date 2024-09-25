'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function TeacherAttendancePage({ classId }) {
    const [classDates, setClassDates] = useState([]);
    const [studentAttendance, setStudentAttendance] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search input
    const [filteredStudents, setFilteredStudents] = useState([]); // State to store filtered students

    useEffect(() => {
        if (!classId) return;

        const fetchAttendanceData = async () => {
            try {
                // Fetch the class data to get the class dates
                const classRes = await fetch(`/api/classes?classId=${classId}`);
                const classData = await classRes.json();
                if (classData && classData.length > 0) {
                    setClassDates(classData[0].dates || []);
                }

                // Fetch the attendance data for all students in the class
                const attendanceRes = await fetch(`/api/attendance?classId=${classId}`);
                const attendanceData = await attendanceRes.json();
                if (attendanceData && attendanceData.length > 0) {
                    setStudentAttendance(attendanceData);
                    setFilteredStudents(attendanceData); // Initially set filtered to all students
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, [classId]);

    // Helper function to check if a student was present on a particular date
    const isPresent = (studentAttendance, date) => {
        return studentAttendance.attendance.some((attDate) => new Date(attDate).toLocaleDateString() === new Date(date).toLocaleDateString());
    };

    // Handle search input and filter students by ID
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        // Filter students by matching the search term with their UserID (studentId)
        if (searchValue === '') {
            setFilteredStudents(studentAttendance); // Reset to all students if search is empty
        } else {
            const filtered = studentAttendance.filter((student) =>
                student.UserID.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredStudents(filtered);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance for Class ID: {classId}</h1>

            {/* Search bar to search for student ID */}
            <input
                type="text"
                placeholder="Search by Student ID"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-300 rounded"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.length === 0 ? (
                    <p>No attendance data available.</p>
                ) : (
                    filteredStudents.map((student, index) => (
                        <Card key={index} className="shadow-md">
                            <CardHeader>
                                <CardTitle>ID: {student.UserID}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {classDates.map((classDate, dateIndex) => (
                                        <div key={dateIndex} className="w-24 text-center">
                                            <p>{new Date(classDate).toLocaleDateString()}</p>
                                            <p className={isPresent(student, classDate) ? 'text-green-500' : 'text-red-500'}>
                                                {isPresent(student, classDate) ? "Present" : "Absent"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
