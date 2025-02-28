'use client';

import { useEffect, useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@/app/components/ui/button";
import { AiFillFileExcel } from 'react-icons/ai';
import * as XLSX from 'xlsx';

export default function ManagerAttendancePage({ locationID }) {
    const [locationDates, setLocationDates] = useState([]);
    const [employeeAttendance, setEmployeeAttendance] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]); 

    useEffect(() => {
        if (!locationID) return;

        const fetchAttendanceData = async () => {
            try {
                // Fetch the location data to get the location dates
                const locationRes = await fetch(`/api/locations?locationID=${locationID}`);
                const locationData = await locationRes.json();
                if (locationData && locationData.length > 0) {
                    setLocationDates(locationData[0].dates || []);
                }

                // Fetch the attendance data for all employees in the location
                const attendanceRes = await fetch(`/api/attendance?locationID=${locationID}`);
                const attendanceData = await attendanceRes.json();
                if (attendanceData && attendanceData.length > 0) {
                    setEmployeeAttendance(attendanceData);
                    setFilteredEmployees(attendanceData); // Initially set filtered to all employees
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, [locationID]);

    // Helper function to check if a employee was present on a particular date
    const isPresent = (employeeAttendance, date) => {
        return employeeAttendance.attendance.some((attDate) => new Date(attDate).toLocaleDateString() === new Date(date).toLocaleDateString());
    };

    // Helper function to calculate total absences
    const getTotalAbsences = (employee) => {
        const totalLocations = locationDates.length;
        const absences = locationDates.filter(date => !isPresent(employee, date)).length;
        return `${absences}/${totalLocations}`;
    };

    // Handle search input and filter employees by ID
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        // Filter employees by matching the search term with their UserID (employeeID)
        if (searchValue === '') {
            setFilteredEmployees(employeeAttendance); // Reset to all employees if search is empty
        } else {
            const filtered = employeeAttendance.filter((employee) =>
                employee.UserID.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
    };

    // Create dynamic columns for DataGrid
    const columns = useMemo(() => {
        const dateColumns = locationDates.map((date, index) => ({
            field: `date_${index}`,
            headerName: new Date(date).toLocaleDateString(), // Display formatted date as header
            width: 150,
            renderCell: (params) => (
                <span className={params.value ? 'text-green-500' : 'text-red-500'}>
                    {params.value ? 'Present' : 'Absent'}
                </span>
            )
        }));

        return [
            { field: 'UserID', headerName: 'Employee ID', width: 150 }, 
            { 
                field: 'totalAbsent', 
                headerName: 'Total Absent', 
                width: 150, 
                renderCell: (params) => (
                    <span className="text-black-500 font-bold">
                        {params.value}
                    </span>
                )
            },
            ...dateColumns 
        ];
    }, [locationDates]);

    const rows = useMemo(() => {
        return filteredEmployees.map((employee, index) => {
            const row = { id: index, UserID: employee.UserID };

            // Calculate the total absences for each employee
            row['totalAbsent'] = getTotalAbsences(employee);

            // Add presence or absence for each date
            locationDates.forEach((date, dateIndex) => {
                row[`date_${dateIndex}`] = isPresent(employee, date);
            });

            return row;
        });
    }, [filteredEmployees, locationDates]);

    const exportToExcel = () => {
        const excelData = rows.map((row) => {
            const formattedRow = { ...row };
    
            locationDates.forEach((date, index) => {
                const key = `date_${index}`;
                const formattedDate = new Date(date).toLocaleDateString(); 
                formattedRow[formattedDate] = row[key] ? 'Present' : 'Absent'; 
                delete formattedRow[key];
            });
    
            return formattedRow;
        });
    
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();  
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");   
        XLSX.writeFile(workbook, `attendance_${locationID}.xlsx`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance for Locations ID: {locationID}</h1>

            
            <div className="flex justify-between items-center mb-4">
                {/* Search bar aligned to the left */}
                <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border border-gray-300 rounded"
                />

                {/* Export button aligned to the right */}
                <Button 
                    onClick={exportToExcel} 
                    className="p-2 bg-white text-black border-gray-300 rounded flex items-center"
                >
                    <AiFillFileExcel className="mr-2" />
                    Export to Excel
                </Button>
            </div>

            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                />
            </div>
        </div>
    );
}
