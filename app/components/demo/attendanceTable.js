'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
    getCoreRowModel,
    useReactTable,
    flexRender
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function AttendanceTable() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    // Fetch attendance data from the API
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await fetch("/api/attendance");
                const data = await res.json();
                setAttendanceRecords(data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };
        fetchAttendance();
    }, []);

    const columns = [
        { accessorKey: "UserID", header: "User ID" },
        {
            accessorKey: "classID",
            header: "Class ID",
            cell: ({ row }) => {
                const classID = row.original.classID;
                return classID ? classID : "N/A"; // Handle null classID
            },
        },
        {
            id: "attendance",
            header: "Attendance",
            cell: ({ row }) => {
                const attendance = row.original.attendance; // Access attendance directly from original row data
                return (
                    <div>
                        {Array.isArray(attendance) && attendance.length > 0 ? (
                            attendance.map((attend, index) => (
                                <div key={index}>
                                    {new Date(attend).toLocaleString()}
                                </div>
                            ))
                        ) : (
                            <span>No attendance records</span>
                        )}
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: attendanceRecords,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center py-4">
                                        No attendance records found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
