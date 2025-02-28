import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { DataGrid } from '@mui/x-data-grid';
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { format, isSameDay } from "date-fns"; 
import { Select, MenuItem } from "@mui/material";

export default function LocationDetails({ params }) {
    const { locationID } = params; 
    const [locationData, setLocationData] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [managerID, setManagerID] = useState(""); 
    const [employeeIDs, setEmployeeIDs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]); 
    const [filteredEmployees, setFilteredEmployees] = useState([]); 
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/users?role=employee');
                if (!response.ok) {
                    throw new Error("Failed to fetch employees");
                }
                const data = await response.json();
                setEmployees(data);
                setFilteredEmployees(data);
            } catch (err) {
                console.error(err);
                setError("Error fetching employees");
            }
        };

        const fetchManagers = async () => {
            try {
                const response = await fetch('/api/users?role=manager');
                if (!response.ok) {
                    throw new Error("Failed to fetch managers");
                }
                const data = await response.json();
                console.log("Fetched managers:", data);            
                setManagers(data);
                setFilteredManagers(data);
            } catch (err) {
                console.error(err);
                setError("Error fetching managers");
            }
        };

        const fetchLocationData = async () => {
            try {
                const response = await fetch(`/api/locations/${locationID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch location details");
                }
                const data = await response.json();
                setLocationName(data.locationName);
                setManagerID(data.managerID);
                setEmployeeIDs(data.employeeIDs);
                setDates(data.dates.map(date => new Date(date)));
            } catch (err) {
                console.error(err);
                setError("Error fetching location details");
            }
        };

        fetchEmployees();
        fetchManagers();
        fetchLocationData();
    }, [locationID]);

    useEffect(() => {
        const results = employees.filter(employee =>
            employee.id.toString().includes(searchTerm) || 
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredEmployees(results);
        console.log("Filtered employees:", results);
    }, [searchTerm, employees]);
    
    useEffect(() => {
        const managerResults = managers.filter(manager =>
            manager.id.toString().includes(searchTerm) || 
            manager.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredManagers(managerResults);
    }, [searchTerm, managers]);

    const toggleEmployeeSelection = (employeeID) => {
        setEmployeeIDs((prev) => {
            if (prev.includes(employeeID)) {
                return prev.filter(id => id !== employeeID); 
            } else {
                return [...prev, employeeID]; 
            }
        });
    };

    const handleUpdateLocation = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        const formattedDates = dates.length > 0 ? dates.map((date) => date.toISOString()):[];

        try {
            const res = await fetch(`/api/locations/update/${locationID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ locationID, locationName, managerID, employeeIDs, dates: formattedDates }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("Location updated successfully!");
            } else {
                setError(data.error || "Failed to update location");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    const handleDateSelect = (selectedDates) => {
        if (!Array.isArray(selectedDates)) {
            console.error("Expected an array of dates, but got:", selectedDates);
            return;
        }
        const validDates = selectedDates.filter(date => !isNaN(new Date(date).getTime()));
        setDates(validDates);
    };

    // const handleUpdateLocation = async () => {
    //     try {
    //         const res = await fetch(`/api/locations/${locationID}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(locationData),
    //         });
    //         if (!res.ok) throw new Error("Failed to update location details");
    //         alert("Location updated successfully!");
    //     } catch (error) {
    //         console.error("Error updating location:", error);
    //     }
    // };

    const handleAddDate = async () => {
        if (newDate) {
            try {
                const res = await fetch(`/api/locations/${locationID}/dates`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date: newDate }),
                });
                if (!res.ok) throw new Error("Failed to add date");

                setNewDate("");
                const updatedData = await fetch(`/api/locations/${locationID}`);
                setLocationData(await updatedData.json());
            } catch (error) {
                console.error("Error adding date:", error);
            }
        }
    };

    const handleRemoveDate = async (date) => {
        try {
            const res = await fetch(`/api/locations/${locationID}/dates`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date }),
            });
            if (!res.ok) throw new Error("Failed to remove date");

            const updatedData = await fetch(`/api/locations/${locationID}`);
            setLocationData(await updatedData.json());
        } catch (error) {
            console.error("Error removing date:", error);
        }
    };

    const columns = [
        { field: 'date', headerName: 'Location Dates', width: 200 }, 
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

    const rows = locationData?.dates?.map((date, index) => ({
        id: index, 
        date: new Date(date).toLocaleDateString(),
        originalDate: date, 
        action: null, 
    })) || []; 

    if (error) return <div>Error: {error}</div>;
    // if (!locationData) return <div>No location data found.</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Location Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="locationID">Location ID</Label>
                        <Input
                            type="text"
                            value={locationID}
                            onChange={(e) => setLocationData({ ...locationData, locationID: e.target.value })}
                        />
                    </div>

                    <Separator />

                    <div>
                        <Label htmlFor="locationName">Location Name</Label>
                        <Input
                            type="text"
                            value={locationName}
                            onChange={(e) => setLocationData({ ...locationData, locationName: e.target.value })}
                        />
                    </div>

                    <Separator />
 
                    <div>
                        <Label htmlFor="managerID">Manager ID</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left"
                                >
                                    {managerID
                                        ? `${managers.find(manager => manager.id === managerID)?.name} (${managerID})`
                                        : "Select Manager"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <Input
                                    type="text"
                                    placeholder="Search by manager ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mb-2"
                                />
                                <div className="space-y-2">
                                    {filteredManagers.map(manager => (
                                        <div key={manager.id} className="flex items-center">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={managerID === manager.id}
                                                    onChange={() => setManagerID(manager.id)}
                                                    className="mr-2"
                                                />
                                                <span>{manager.name} ({manager.id})</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Separator />
                    
                    <div className="space-y-2">
                        <Label htmlFor="employeeIDs">Employee IDs</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left"
                                >
                                    {employeeIDs.length > 0
                                        ? `${employeeIDs
                                            .map(id => {
                                                const employee = employees.find(emp => emp.id === id);
                                                return employee ? `${employee.name} (${employee.id})` : null;
                                            })
                                            .filter(Boolean)
                                            .join(", ")}`
                                        : "Select Employees"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <Input
                                    type="text"
                                    placeholder="Search by employee ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mb-2"
                                />
                                <div className="space-y-2">
                                    {filteredEmployees.map(employee => (
                                        <div key={employee._id} className="flex items-center">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={employeeIDs.includes(employee.id)} 
                                                    onChange={() => toggleEmployeeSelection(employee.id)} 
                                                    className="mr-2" 
                                                />
                                                <span>{employee.name} ({employee.id})</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <p className="text-sm text-gray-500">Select employees from the list above</p>
                    </div>

                    {/* Save Button */}
                    <Button onClick={handleUpdateLocation} className="mt-4">Save Changes</Button>
                </div>

                {/* Data Grid for Dates */}
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>

                {/* Add Date Section */}
                <div className="flex space-x-2 mt-4">
                    <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <Button onClick={handleAddDate}>Add Date</Button>
                </div>
            </CardContent>
        </Card>
    );
}
