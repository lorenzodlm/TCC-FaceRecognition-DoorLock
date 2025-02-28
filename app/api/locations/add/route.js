import Location from "/app/models/location"; 

export async function POST(req) {
    try {
        const { locationName, locationID, managerID, employeeIDs, dates } = await req.json();

        const existingLocation = await Location.findOne({ locationID });
        if (existingLocation) {
            return new Response(JSON.stringify({ error: "Location ID already exists" }), { status: 400 });
        }

        const newLocation = new Location({ locationName, locationID, managerID, employeeIDs, dates });
        await newLocation.save();

        return new Response(JSON.stringify({ success: true, location: newLocation }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to add location" }), { status: 500 });
    }
}
