'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function StudentAttendancePage({ classId, studentId }) {
    const [classDates, setClassDates] = useState([]); 
    const [studentAttendance, setStudentAttendance] = useState([]); 

    useEffect(() => {
        if (!classId || !studentId) return;

        const fetchAttendanceData = async () => {
            try {
                // Fetch the class data to get the class dates
                const classRes = await fetch(`/api/classes?classId=${classId}`);
                const classData = await classRes.json();
                if (classData && classData.length > 0) {
                    setClassDates(classData[0].dates || []);
                }

                // Fetch the attendance data to get the student's attendance
                const attendanceRes = await fetch(`/api/attendance?classId=${classId}&studentId=${studentId}`);
                const attendanceData = await attendanceRes.json();
                if (attendanceData && attendanceData.length > 0) {
                    setStudentAttendance(attendanceData[0].attendance || []); 
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, [classId, studentId]);

    // Helper function to check if a date is in the student's attendance
    const isPresent = (date) => {
        return studentAttendance.some((attDate) => new Date(attDate).toLocaleDateString() === new Date(date).toLocaleDateString());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance for Class ID: {classId}</h1>
            <div className="flex flex-wrap gap-4">
                {classDates.length === 0 ? (
                    <p>No class dates found.</p>
                ) : (
                    classDates.map((classDate, index) => (
                        <Card 
                            key={index} 
                            className="shadow-md w-48 h-32 flex flex-col justify-between" 
                        >
                            <CardHeader>
                                <CardTitle>{new Date(classDate).toLocaleDateString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={isPresent(classDate) ? 'font-bold text-green-500' : 'text-red-500'}>
                                    {isPresent(classDate) ? "Present" : "Absent"}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
