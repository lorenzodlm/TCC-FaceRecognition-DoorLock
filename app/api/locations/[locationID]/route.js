import Location from "@/app/models/location"; 

export async function GET(req, { params }) {
    const { locationID } = params; 

    try {
        const locationDetails = await Location.findOne({ locationID });

        if (!locationDetails) {
            return new Response(JSON.stringify({ message: "Location not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(locationDetails), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching location details:", error);
        return new Response(
            JSON.stringify({ message: 'Error fetching location details', error: error.message }),
            { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
    }
}
