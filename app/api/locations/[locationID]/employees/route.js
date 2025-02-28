import Location from "@/app/models/location"; 

export async function POST(req, { params }) {

    const { locationID } = params; 
    const { employeeID } = await req.json();

    console.log("*api/locations/[locationID]/employees*");
    console.log("Received locationID:", locationID); // Debugging output
    console.log("Received employeeID:", employeeID);

    try {
        const locationData = await Location.findOneAndUpdate(
            { locationID }, 
            { $addToSet: { employeeIDs: employeeID } }, 
            { new: true }
        );

        if (!locationData) {
            return new Response(JSON.stringify({ error: "Location not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(locationData), { status: 200 });
    } catch (error) {
        console.error("Error adding employee to location:", error);
        return new Response(JSON.stringify({ error: "Failed to add employee to location" }), { status: 500 });
    }
}
