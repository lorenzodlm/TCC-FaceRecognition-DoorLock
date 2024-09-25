'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";

export default function Account() {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const [error, setError] = useState("");

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

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordChangeSuccess(false);
        setError("");

        try {
            const res = await fetch(`/api/auth/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setPasswordChangeSuccess(true);
                setCurrentPassword("");
                setNewPassword("");
            } else {
                setError(data.error || "Password change failed");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

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
                {/* Name */}
                <div className="w-full">
                    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                    <Input id="name" value={user.name} readOnly className="mt-1 w-full" />
                </div>
                <Separator className="w-full my-4" />
                {/* Email */}
                <div className="w-full">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input id="email" value={user.email} readOnly className="mt-1 w-full" />
                </div>
                <Separator className="w-full my-4" />

                {/* Password Change Form */}
                <form className="w-full" onSubmit={handlePasswordChange}>
                    <div className="w-full">
                        <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="text" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            className="mt-1 w-full"
                        />
                    </div>
                    <Separator className="w-full my-4" />
                    <div className="w-full">
                        <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                        <Input
                            id="newPassword"
                            type="text" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 w-full"
                        />
                    </div>
                    <Separator className="w-full my-4" />
                    <Button type="submit" className="w-full">Change Password</Button>
                    {passwordChangeSuccess && <p className="text-green-500 mt-2">Password changed successfully!</p>}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>

            </CardContent>
        </Card>
    );
}
