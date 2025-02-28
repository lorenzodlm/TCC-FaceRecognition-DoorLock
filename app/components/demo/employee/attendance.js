'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function EmployeeAttendancePage({ locationID, employeeID }) {
    const [locationDates, setLocationDates] = useState([]); 
    const [employeeAttendance, setEmployeeAttendance] = useState([]); 

    useEffect(() => {
        if (!locationID || !employeeID) return;

        const fetchAttendanceData = async () => {
            try {
                // Fetch the location data to get the location dates
                const locationRes = await fetch(`/api/locations?locationID=${locationID}`);
                const locationData = await locationRes.json();
                if (locationData && locationData.length > 0) {
                    setLocationDates(locationData[0].dates || []);
                }

                // Fetch the attendance data to get the employee's attendance
                const attendanceRes = await fetch(`/api/attendance?locationID=${locationID}&employeeID=${employeeID}`);
                const attendanceData = await attendanceRes.json();
                if (attendanceData && attendanceData.length > 0) {
                    setEmployeeAttendance(attendanceData[0].attendance || []); 
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, [locationID, employeeID]);

    // Helper function to check if a date is in the employee's attendance
    const isPresent = (date) => {
        return employeeAttendance.some((attDate) => new Date(attDate).toLocaleDateString() === new Date(date).toLocaleDateString());
    };

    // Calculate total absences
    const totallocations = locationDates.length;
    const totalAbsent = locationDates.filter(date => !isPresent(date)).length;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance for Location ID: {locationID}</h1>
            <p className="text-lg font-bold text-red-500">
                Total Absent: {`${totalAbsent}/${totalLocations}`} {/* Show in absent/total format */}
            </p>
            <br />


            <div className="flex flex-wrap gap-4">
                {locationDates.length === 0 ? (
                    <p>No location dates found.</p>
                ) : (
                    locationDates.map((locationDate, index) => (
                        <Card 
                            key={index} 
                            className="shadow-md w-48 h-32 flex flex-col justify-between" // Ensuring same dimensions
                        >
                            <CardHeader>
                                <CardTitle>{new Date(locationDate).toLocaleDateString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={isPresent(locationDate) ? 'font-bold text-green-500' : 'text-red-500'}>
                                    {isPresent(locationDate) ? "Present" : "Absent"}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}5