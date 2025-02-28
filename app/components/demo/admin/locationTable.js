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

export default function locationTable() {
    const [locations, setLocations] = useState([]);

    // Fetch locations from the API
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch("/api/locations");
                const data = await res.json();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        fetchLocations();
    }, []);

    const columns = [
        { accessorKey: "locationName", header: "Location Name" },
        { accessorKey: "locationID", header: "Location ID" },
        { accessorKey: "managerID", header: "Manager ID" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Link href={`/users/locations/${row.getValue("locationID")}`} className="text-black-500 hover:underline">
                    View Details
                </Link>
            ),
        },
    ];

    const table = useReactTable({
        data: locations,
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
                                        No locations found
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
