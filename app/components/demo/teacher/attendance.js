'use client';

import { useEffect, useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@/app/components/ui/button";
import { AiFillFileExcel } from 'react-icons/ai';
import * as XLSX from 'xlsx';

export default function TeacherAttendancePage({ classId }) {
    const [classDates, setClassDates] = useState([]);
    const [studentAttendance, setStudentAttendance] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]); 

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

    // Helper function to calculate total absences
    const getTotalAbsences = (student) => {
        const totalClasses = classDates.length;
        const absences = classDates.filter(date => !isPresent(student, date)).length;
        return `${absences}/${totalClasses}`;
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

    // Create dynamic columns for DataGrid
    const columns = useMemo(() => {
        const dateColumns = classDates.map((date, index) => ({
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
            { field: 'UserID', headerName: 'Student ID', width: 150 }, 
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
    }, [classDates]);

    const rows = useMemo(() => {
        return filteredStudents.map((student, index) => {
            const row = { id: index, UserID: student.UserID };

            // Calculate the total absences for each student
            row['totalAbsent'] = getTotalAbsences(student);

            // Add presence or absence for each date
            classDates.forEach((date, dateIndex) => {
                row[`date_${dateIndex}`] = isPresent(student, date);
            });

            return row;
        });
    }, [filteredStudents, classDates]);

    const exportToExcel = () => {
        const excelData = rows.map((row) => {
            const formattedRow = { ...row };
    
            classDates.forEach((date, index) => {
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
        XLSX.writeFile(workbook, `attendance_${classId}.xlsx`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance for Class ID: {classId}</h1>

            
            <div className="flex justify-between items-center mb-4">
                {/* Search bar aligned to the left */}
                <input
                    type="text"
                    placeholder="Search by Student ID"
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
