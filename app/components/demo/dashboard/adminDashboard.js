'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const userID = localStorage.getItem('_id'); // Retrieve user ID from local storage

    useEffect(() => {
        setIsClient(true);
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users?id=${userID}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        const fetchAttendanceData = async () => {
            try {
                const res = await fetch('/api/charts');
                const data = await res.json();
                console.log("Fetched attendance data:", data);
                setAttendanceData(data || []);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
                setAttendanceData([]);
            }
        };

        if (userID) {
            fetchUser();
            fetchAttendanceData();
        }
    }, [userID]);

    if (!user || !isClient) {
        return <div>Loading...</div>; // Loading state while fetching user data
    }

    // Process attendance data for charts
    const locationData = {};
    const dateData = {};
    const userData = {};

    // Filter out undefined or null records and process data for charts
    (attendanceData || []).filter(record => record && record.locationID && record.userID && Array.isArray(record.attendance))
        .forEach(record => {
            // Count by location
            if (record.locationID) {
                locationData[record.locationID] = (locationData[record.locationID] || 0) + record.attendance.length;
            }
            
            // Count by date - filter out invalid dates
            (record.attendance || []).filter(dateStr => dateStr).forEach(dateStr => {
                try {
                    const date = new Date(dateStr);
                    if (!isNaN(date.getTime())) {
                        const formattedDate = date.toLocaleDateString();
                        dateData[formattedDate] = (dateData[formattedDate] || 0) + 1;
                    }
                } catch (e) {
                    console.error("Invalid date:", dateStr);
                }
            });
            
            // Count by user
            if (record.userID) {
                userData[record.userID] = (userData[record.userID] || 0) + record.attendance.length;
            }
        });

    // Sort dates chronologically
    const sortedDates = Object.keys(dateData).sort((a, b) => new Date(a) - new Date(b));

    // Chart configurations
    const locationChartData = {
        labels: Object.keys(locationData).filter(Boolean),
        datasets: [
            {
                label: 'Attendance by Location',
                data: Object.keys(locationData).filter(Boolean).map(key => locationData[key]),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const dateChartData = {
        labels: sortedDates,
        datasets: [
            {
                label: 'Attendance Trend',
                data: sortedDates.map(date => dateData[date]),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
            },
        ],
    };

    const userChartData = {
        labels: Object.keys(userData).filter(Boolean),
        datasets: [
            {
                label: 'Attendance by User',
                data: Object.keys(userData).filter(Boolean).map(key => userData[key]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    // Check if we have valid data to display
    const hasLocationData = locationChartData.labels.length > 0;
    const hasDateData = dateChartData.labels.length > 0;
    const hasUserData = userChartData.labels.length > 0;
    const hasAnyData = hasLocationData || hasDateData || hasUserData;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-4 mb-8">
                <Card className="flex-1 min-w-[200px]">
                    <CardHeader>
                        <CardTitle>Name</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{user.name}</p>
                    </CardContent>
                </Card>
                <Card className="flex-1 min-w-[200px]">
                    <CardHeader>
                        <CardTitle>Email</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{user.email}</p>
                    </CardContent>
                </Card>
                <Card className="flex-1 min-w-[200px]">
                    <CardHeader>
                        <CardTitle>ID</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{user.id}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            {hasAnyData ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Attendance Analytics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hasLocationData && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Attendance by Location</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <Bar options={chartOptions} data={locationChartData} />
                                </CardContent>
                            </Card>
                        )}
                        
                        {hasDateData && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Attendance Trend</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <Line options={chartOptions} data={dateChartData} />
                                </CardContent>
                            </Card>
                        )}
                        
                        {hasUserData && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Attendance by User</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <Pie options={chartOptions} data={userChartData} />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            ) : (
                <Card className="mt-8">
                    <CardContent className="p-6">
                        <p className="text-center text-gray-500">No attendance data available</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}