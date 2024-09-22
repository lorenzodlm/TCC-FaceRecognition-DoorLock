'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function ClassesPage() {
    const [classes, setClasses] = useState([]);
    const router = useRouter(); // Initialize router

    useEffect(() => {
        const fetchClasses = async () => {
            const studentId = localStorage.getItem('id'); 
            if (!studentId) return; 

            try {
                const res = await fetch(`/api/classes?studentId=${studentId}`);
                const data = await res.json();
                setClasses(data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);

    const handleViewAttendance = (classId) => {
        const studentId = localStorage.getItem('id');
        router.push(`/studentClasses/attendance?page=${classId}&studentId=${studentId}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Classes</h1>
            <div className="grid grid-cols-1 gap-4">
                {classes.map((classItem) => (
                    <Card key={classItem._id} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">{classItem.className} ({classItem.classCode})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <button 
                                onClick={() => handleViewAttendance(classItem._id)} 
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
