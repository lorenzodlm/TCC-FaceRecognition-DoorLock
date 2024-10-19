// Other imports remain the same
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { DataGrid } from '@mui/x-data-grid';

export default function ClassDetails({ params }) {
    const { classCode: classCode } = params; 
    const [classData, setClassData] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    console.log('Class Code:', params);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                console.log('Try: Fetching class details for:', classCode);
                const res = await fetch(`/api/classes/${classCode}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch class details");
                }
                const data = await res.json();
                console.log("Fetched class data:", data);
                setClassData(data);
            } catch (error) {
                console.error("Error fetching class details:", error);
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };
        
        if (classCode) {
            console.log('IF: Fetching class details for:', classCode);
            fetchClassDetails();
        }
    }, [classCode]);

    const handleAddDate = async () => {
        if (newDate) {
            try {
                const res = await fetch(`/api/classes/${classCode}/dates`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ date: newDate }),
                });

                if (!res.ok) {
                    throw new Error("Failed to add date");
                }
                
                setNewDate(""); 
                
                const data = await fetch(`/api/classes/${classCode}`);
                setClassData(await data.json());
            } catch (error) {
                console.error("Error adding date:", error);
            }
        }
    };

    const handleRemoveDate = async (date) => {
        console.log('Removing date:', date);
        try {
            const res = await fetch(`/api/classes/${classCode}/dates`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date }),
            });
            
            if (!res.ok) {
                throw new Error("Failed to remove date");
            }

            const data = await fetch(`/api/classes/${classCode}`);
            setClassData(await data.json());
        } catch (error) {
            console.error("Error removing date:", error);
        }
    };

    const columns = [
        { field: 'date', headerName: 'Class Dates', width: 200 }, 
        {
            field: 'action',
            headerName: 'Actions',
            renderCell: (params) => (
                <Button onClick={() => handleRemoveDate(params.row.originalDate)} color="error">
                    Remove
                </Button>
            ),
            width: 120,
        },
    ];

    const rows = classData?.dates?.map((date, index) => ({
        id: index, 
        date: new Date(date).toLocaleDateString(),
        originalDate: date, 
        action: null, 
    })) || []; 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!classData) return <div>No class data found.</div>;

    return (
        <Card>
            <CardContent>
                <h2 className="text-lg font-bold">Class Details</h2>
                <p>Class Code: {classData.classCode}</p>
                <p>Class Name: {classData.className}</p>
                <p>Teacher ID: {classData.teacherID}</p>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
                <div className="flex space-x-2 mt-4">
                    <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <Button onClick={handleAddDate}>Add Date</Button>
                </div>
            </CardContent>
        </Card>
    );
}
