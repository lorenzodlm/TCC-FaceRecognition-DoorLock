'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function UserDetails({ params }) {
    const { id } = params;  
    const [user, setUser] = useState(null);
    const [classes, setClasses] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]); // State for all available classes
    const [selectedClassId, setSelectedClassId] = useState(""); // State for selected class

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const res = await fetch(`/api/users?userID=${id}`);
                    const data = await res.json();
                    
                    if (Array.isArray(data) && data.length > 0) {
                        const userData = data[0];
                        setUser(userData);
                        setClasses(userData.classIds);
                    } else {
                        console.error("User not found");
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        const fetchClasses = async () => {
            try {
                const res = await fetch('/api/classes');
                const data = await res.json();
                setAvailableClasses(data); // Assuming data is an array of classes
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchUser();
        fetchClasses();
    }, [id]);

    const addClass = async () => {
        if (selectedClassId) {
            const selectedClass = availableClasses.find(classItem => classItem._id === selectedClassId);
            if (!selectedClass) {
                console.error("Selected class not found");
                return;
            }

            const { classCode } = selectedClass; 
            if (!classCode) {
                console.error("classCode is undefined for the selected class");
                return;
            }
            
            try {
                const res = await fetch(`/api/users/${id}/classes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ classCode: selectedClass.classCode }), 
                });
    
                if (res.ok) {
                    setClasses((prevClasses) => [...prevClasses, selectedClass.classCode]); 
                    setSelectedClassId(""); 
                    await addStudentToClass(selectedClass.classCode);
                } else {
                    console.error("Failed to add class");
                }
            } catch (error) {
                console.error("Error adding class:", error);
            }
        }
    };
    
    const addStudentToClass = async (classCode) => {
        console.log("Class Code:",classCode);
        try {
            const res = await fetch(`/api/classes/${classCode}/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: user.id }), 
            });
    
            if (!res.ok) {
                console.error("Failed to add student to class");
                const errorResponse = await res.json();
                console.error("Server response:", errorResponse); 
            }
        } catch (error) {
            console.error("Error adding student to class:", error);
        }
    };
    

    const removeClass = async (classId) => {
        try {
            const res = await fetch(`/api/users/${id}/classes`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classId }),
            });

            if (res.ok) {
                setClasses((prevClasses) => prevClasses.filter(c => c !== classId));
            } else {
                console.error("Failed to remove class");
            }
        } catch (error) {
            console.error("Error removing class:", error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <div className="flex flex-wrap gap-4">
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
                <Card className="flex-1 min-w-[200px]">
                    <CardHeader>
                        <CardTitle>Role</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{user.role}</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold mt-6">Classes</h2>
            <div className="mb-4">
                <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select a class</option>
                    {availableClasses.map((classItem) => (
                        <option key={classItem._id} value={classItem._id}>
                            {classItem.className} ({classItem.classCode})
                        </option>
                    ))}
                </select>
                <button onClick={addClass} className="ml-2 bg-blue-500 text-white p-2 rounded">Add Class</button>
            </div>
            <ul>
                {classes.map((classId) => (
                    <li key={classId} className="flex justify-between items-center">
                        <span>{classId}</span>
                        <button onClick={() => removeClass(classId)} className="text-red-500">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
