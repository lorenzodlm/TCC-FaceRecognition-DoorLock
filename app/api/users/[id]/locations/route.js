import User from "@/app/models/user"; 
import Location from "@/app/models/location";

export async function POST(req, { params }) {
    const { id } = params; 
    const { locationID } = await req.json();

    console.log("*api/users/[id]/locations*");
    console.log("User ID:", Number(id));
    console.log("Location ID:", locationID);

    try {
        const user = await User.findOneAndUpdate(
            { id: Number(id) },
            { $addToSet: { locationIDs: locationID } }, 
            { new: true } 
        );

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(user), { status: 200 });

        
    } catch (error) {
        console.error("Error adding location:", error);
        return new Response(JSON.stringify({ error: "Failed to add location" }), { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    const { id } = params; 
    const { locationID } = await req.json();

    try {
        const user = await User.findOneAndUpdate(
            { id },
            { $pull: { locationIDs: locationID } },
            { new: true }
        );

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const location = await Location.findOneAndUpdate(
            { locationID },
            { $pull: { employeeIDs: id } },
            { new: true }
        );

        if (!location) {
            return new Response(JSON.stringify({ error: "Location not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ user, location }), { status: 200 });
    } catch (error) {
        console.error("Error removing location:", error);
        return new Response(JSON.stringify({ error: "Failed to remove location" }), { status: 500 });
    }
}
