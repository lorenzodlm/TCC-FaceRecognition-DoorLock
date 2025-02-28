'use client';
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, isSameDay } from "date-fns"; 

export default function AddLocations() {
    const [locationName, setLocationName] = useState("");
    const [locationID, setLocationID] = useState("");
    const [managerID, setManagerID] = useState(""); 
    const [employeeIDs, setEmployeeIDs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]); 
    const [filteredEmployees, setFilteredEmployees] = useState([]); 
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [dates, setDates] = useState([]);
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
                setManagers(data);
                setFilteredManagers(data); // Initially populate the filtered managers list
            } catch (err) {
                console.error(err);
                setError("Error fetching managers");
            }
        };

        fetchEmployees();
        fetchManagers();
    }, []);

    useEffect(() => {
        const results = employees.filter(employee =>
            employee.id.toString().includes(searchTerm) || 
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(results);
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

    const handleAddLocations = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        const formattedDates = dates.length > 0 ? dates.map((date) => date.toISOString()):[];

        try {
            const res = await fetch(`/api/locations/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ locationName, locationID, managerID, employeeIDs, dates: formattedDates }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("Location added successfully!");
                setLocationName("");
                setLocationID("");
                setManagerID(""); 
                setEmployeeIDs([]);
                setDates([]);
                setSearchTerm(""); 
            } else {
                setError(data.error || "Failed to add location");
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
    
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Add New Location</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddLocations} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="locationName">Location Name</Label>
                        <Input
                            id="locationName"
                            type="text"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                    </div>
                    <Separator />
                    
                    <div className="space-y-2">
                        <Label htmlFor="locationID">Location ID</Label>
                        <Input
                            id="locationID"
                            type="text"
                            value={locationID}
                            onChange={(e) => setLocationID(e.target.value)}
                        />
                    </div>
                    <Separator />
                    
                    <div className="space-y-2">
                        <Label htmlFor="managerID">Manager</Label>
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
                        <Label htmlFor="employeeIDs">Employees</Label>
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

                    <Separator />
                    
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal whitespace-normal break-words"
                                >
                                    {dates.length
                                        ? dates
                                            .filter((date) => !isNaN(date.getTime())) 
                                            .map((date) => format(date, "PPP"))
                                            .join(", ")
                                        : "Pick dates"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="multiple"
                                    selected={dates}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-sm text-gray-500">Select dates for the Location</p>
                    </div>

                    <Separator />
                    <br />
                    <Button type="submit" className="w-full">Add Location</Button>
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
