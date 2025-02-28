'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function UserDetails({ params }) {
    const { id } = params;  
    const [user, setUser] = useState(null);
    const [Locations, setLocations] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]); // State for all available Locations
    const [selectedLocationID, setSelectedLocationID] = useState(""); // State for selected location

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const res = await fetch(`/api/users?userID=${id}`);
                    const data = await res.json();
        
                    if (Array.isArray(data) && data.length > 0) {
                        const userData = data[0];
                        setUser(userData);
                        
                        if (userData.locationIDs && userData.locationIDs.length > 0) {
                            const locationResponses = await Promise.all(
                                userData.locationIDs.map(locationID =>
                                    fetch(`/api/locations/${locationID}`).then(res => res.json())
                                )
                            );
        
                            const locationNames = locationResponses.map(location => location.locationName);
                            setLocations(locationNames);
                        } else {
                            setLocations([]);
                        }
                    } else {
                        console.error("User not found");
                        setLocations([]);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setLocations([]);
                }
            }
        };
        

        const fetchLocations = async () => {
            try {
                const res = await fetch('/api/locations');
                const data = await res.json();
                setAvailableLocations(data); // Assuming data is an array of locations
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchUser();
        fetchLocations();
    }, [id]);

    const addLocation = async () => {
        if (selectedLocationID) {
            const selectedLocation = availableLocations.find(locationItem => locationItem._id === selectedLocationID);
            if (!selectedLocation) {
                console.error("Selected location not found");
                return;
            }

            const { locationID } = selectedLocation; 
            if (!locationID) {
                console.error("locationID is undefined for the selected location");
                return;
            }
            
            try {
                const res = await fetch(`/api/users/${id}/locations`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ locationID: selectedLocation.locationID }), 
                });
    
                if (res.ok) {
                    setLocations((prevLocations) => [...prevLocations, selectedLocation.locationName]); 
                    setSelectedLocationID(""); 
                    await addEmployeeToLocation(selectedLocation.locationID);
                } else {
                    console.error("Failed to add location");
                }
            } catch (error) {
                console.error("Error adding location:", error);
            }
        }
    };
    
    const addEmployeeToLocation = async (locationID) => {
        console.log("*addEmployeeToLocation* LocationID:",locationID);
        try {
            const res = await fetch(`/api/locations/${locationID}/employees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeID: user.id }), 
            });
    
            if (!res.ok) {
                console.error("Failed to add employee to location");
                const errorResponse = await res.json();
                console.error("Server response:", errorResponse); 
            }
        } catch (error) {
            console.error("Error adding employee to location:", error);
        }
    };
    

    const removeLocation = async (locationName) => {
        const location = availableLocations.find(loc => loc.locationName === locationName);
        if (!location) {
            console.error("Location not found");
            return;
        }

        try {
            const res = await fetch(`/api/users/${id}/locations`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locationID: location.locationID }),
            });

            if (res.ok) {
                setLocations((prevLocations) => prevLocations.filter(c => c !== locationName));
            } else {
                console.error("Failed to remove location");
            }
        } catch (error) {
            console.error("Error removing location:", error);
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

            <h2 className="text-xl font-bold mt-6">Locations</h2>
            <div className="mb-4">
                <select
                    value={selectedLocationID}
                    onChange={(e) => setSelectedLocationID(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select a Location</option>
                    {availableLocations.map((locationItem) => (
                        <option key={locationItem._id} value={locationItem._id}>
                            {locationItem.locationName} ({locationItem.locationID})
                        </option>
                    ))}
                </select>
                <button onClick={addLocation} className="ml-2 bg-blue-500 text-white p-2 rounded">Add Location</button>
            </div>
            <ul>
            {Locations.length > 0 ? (
                Locations.map((locationName) => (
                    <li key={locationName} className="flex justify-between items-center">
                        <span>{locationName}</span>
                        <button onClick={() => removeLocation(locationName)} className="text-red-500">Remove</button>
                    </li>
                ))
            ) : (
                <p>No locations assigned.</p>
            )}

            </ul>
        </div>
    );
}
