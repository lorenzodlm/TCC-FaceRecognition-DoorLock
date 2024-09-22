'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export default function Account() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('_id'); 
    console.log("User _id:", userId);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users?id=${userId}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="rounded-lg border mt-2 max-w-md mx-auto shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl font-bold flex flex-col items-center">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center">
                {/* User ID */}
                <div className="w-full">
                    <Label htmlFor="id" className="text-sm font-medium">User ID</Label>
                    <Input id="id" value={user.id} readOnly className="mt-1 w-full" />
                </div>
                <Separator className="w-full my-4" />
                <Separator className="w-full my-4" />
                {/* Name */}
                <div className="w-full">
                    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                    <Input id="name" value={user.name} readOnly className="mt-1 w-full" />
                </div>
                <Separator className="w-full my-4" />
                <Separator className="w-full my-4" />
                {/* Email */}
                <div className="w-full">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input id="email" value={user.email} readOnly className="mt-1 w-full" />
                </div>
                <Separator className="w-full my-4" />
                <Separator className="w-full my-4" />
                {/* Password */}
                <div className="w-full">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Input id="password" value={user.password} readOnly type="password" className="mt-1 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}
