'use client';

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

export default function AddClass() {
    const [className, setClassName] = useState("");
    const [classCode, setClassCode] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [studentIDs, setStudentIDs] = useState([]);
    const [dates, setDates] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleAddClass = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        try {
            const res = await fetch(`/api/classes/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ className, classCode, teacherID, studentIDs, dates }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("Class added successfully!");
                setClassName("");
                setClassCode("");
                setTeacherID("");
                setStudentIDs([]);
                setDates([]);
            } else {
                setError(data.error || "Failed to add class");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Add New Class</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddClass} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="className">Class Name</Label>
                        <Input
                            id="className"
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                        />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="classCode">Class Code</Label>
                        <Input
                            id="classCode"
                            type="text"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                        />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="teacherID">Teacher ID</Label>
                        <Input
                            id="teacherID"
                            type="text"
                            value={teacherID}
                            onChange={(e) => setTeacherID(e.target.value)}
                        />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="studentIDs">Student IDs</Label>
                        <Input
                            id="studentIDs"
                            type="text"
                            value={studentIDs.join(", ")}
                            onChange={(e) => setStudentIDs(e.target.value.split(", "))}
                        />
                        <p className="text-sm text-gray-500">Enter student IDs separated by commas</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="dates">Class Dates</Label>
                        <Input
                            id="dates"
                            type="text"
                            value={dates.join(", ")}
                            onChange={(e) => setDates(e.target.value.split(", ").map(date => new Date(date)))}
                        />
                        <p className="text-sm text-gray-500">Enter class dates separated by commas (YYYY-MM-DD format)</p>
                    </div>
                    <Separator />
                    <br />
                    <Button type="submit" className="w-full">Add Class</Button>
                </form>
                {success && (
                    <Alert className="mt-4" variant="success">
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert className="mt-4" variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}