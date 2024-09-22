'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function StudentAttendancePage({ classId, studentId }) {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        if (!classId || !studentId) return;

        const fetchAttendance = async () => {
            try {
                const res = await fetch(`/api/attendance?classId=${classId}&studentId=${studentId}`);
                const data = await res.json();
                setAttendance(data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        fetchAttendance();
    }, [classId, studentId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance for Class ID: {classId}</h1>
            <div>
                {attendance.map((record) => (
                    <Card key={record.date} className="shadow-md mb-4">
                        <CardHeader>
                            <CardTitle>{record.date}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{record.status}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
