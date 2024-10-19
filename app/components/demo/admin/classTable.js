'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import {
    getCoreRowModel,
    useReactTable,
    flexRender
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import Link from "next/link";

export default function ClassTable() {
    const [classes, setClasses] = useState([]);

    // Fetch classes from the API
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await fetch("/api/classes");
                const data = await res.json();
                setClasses(data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

    const columns = [
        { accessorKey: "className", header: "Class Name" },
        { accessorKey: "classCode", header: "Class Code" },
        { accessorKey: "teacherID", header: "Teacher ID" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Link href={`/users/classes/${row.getValue("classCode")}`} className="text-black-500 hover:underline">
                    View Details
                </Link>
            ),
        },
    ];

    const table = useReactTable({
        data: classes,
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
                                        No classes found
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
