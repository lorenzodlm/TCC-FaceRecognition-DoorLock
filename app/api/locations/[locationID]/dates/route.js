import Location from "@/app/models/location"; 
export async function POST(req, { params }) {
    const { locationID } = params;
    const { date } = await req.json();

    if (!date) {
        return new Response(JSON.stringify({ message: 'Date is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const updatedLocation = await Location.findOneAndUpdate(
            { id: locationID },
            { $addToSet: { dates: new Date(date) } }, 
            { new: true } 
        );

        if (!updatedLocation) {
            return new Response(JSON.stringify({ message: 'Location not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: 'Date added successfully', dates: updatedLocation.dates }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error adding date:", error);
        return new Response(JSON.stringify({ message: 'Failed to add date' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(req, { params }) {
    const { locationID } = params;
    const { date } = await req.json();

    if (!date) {
        return new Response(JSON.stringify({ message: 'Date is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return new Response(JSON.stringify({ message: 'Invalid date format' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const updatedLocation = await Location.findOneAndUpdate(
            { id: locationID },
            { $pull: { dates: new Date(date) } }, 
            { new: true } 
        );

        if (!updatedLocation) {
            return new Response(JSON.stringify({ message: 'Location not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: 'Date removed successfully', dates: updatedLocation.dates }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error removing date:", error);
        return new Response(JSON.stringify({ message: 'Failed to remove date' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
