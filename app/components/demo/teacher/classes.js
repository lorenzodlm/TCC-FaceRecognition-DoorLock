'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function TeacherClassesPage() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const teacherId = localStorage.getItem('id'); 
            if (!teacherId) return; 

            try {
                const res = await fetch(`/api/classes?teacherId=${teacherId}`);
                const data = await res.json();
                setClasses(data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);

    const handleViewAttendance = (classId) => {
        window.location.href = `/teacherClasses/attendance?classId=${classId}`;
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((classItem) => (
                    <Card key={classItem._id} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">{classItem.className} ({classItem.classCode})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <button 
                                onClick={() => handleViewAttendance(classItem.classCode)} 
                                className="text-blue-500 hover:underline"
                            >
                                View Attendance
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
