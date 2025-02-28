'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const employeeID = localStorage.getItem('id'); 
            if (!employeeID) return; 

            try {
                const res = await fetch(`/api/locations?employeeID=${employeeID}`);
                const data = await res.json();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    const handleViewAttendance = (locationID) => {
        const employeeID = localStorage.getItem('id');
        window.location.href = `/employeeLocations/attendance?locationID=${locationID}&employeeID=${employeeID}`;
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Locations</h1>
            <div className="grid grid-cols-1 gap-4">
                {locations.map((locationItem) => (
                    <Card key={locationItem._id} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">{locationItem.locationName} ({locationItem.locationID})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <button 
                                onClick={() => handleViewAttendance(locationItem.locationID)} 
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
