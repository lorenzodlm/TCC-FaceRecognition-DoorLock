'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import {
    getCoreRowModel,
    useReactTable,
    flexRender
} from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import Link from 'next/link';


export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState("all"); // Default to "all" users

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const query = selectedRole === "all" ? "" : `?role=${selectedRole}`;
                const res = await fetch(`/api/users${query}`);
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [selectedRole]);


    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "password", header: "Password" },
        { accessorKey: "role", header: "Role" },
        {
            accessorKey: "classIds",
            header: "Class IDs",
            cell: ({ row }) => {
                const classIds = row.getValue("classIds");
                return Array.isArray(classIds) ? classIds.join(", ") : "N/A";
            },
        },
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            {/* Role Filter Dropdown */}
            <div className="mb-4">
                <Select onValueChange={setSelectedRole} value={selectedRole}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <Card>
                <CardContent>
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
                            {table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Link href={`/users/${row.original.id}`} className="text-black-500 hover:underline">
                                            View Details
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}