import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function ManagerDashboard() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('_id'); // Retrieve user ID from local storage

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
        return <div>Loading...</div>; // Loading state while fetching user data
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
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
            </div>
        </div>
    );
}
