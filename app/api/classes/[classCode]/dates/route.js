import Class from "@/app/models/class"; 
export async function POST(req, { params }) {
    const { classCode } = params;
    const { date } = await req.json();

    if (!date) {
        return new Response(JSON.stringify({ message: 'Date is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const updatedClass = await Class.findOneAndUpdate(
            { classCode: classCode },
            { $addToSet: { dates: new Date(date) } }, 
            { new: true } 
        );

        if (!updatedClass) {
            return new Response(JSON.stringify({ message: 'Class not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: 'Date added successfully', dates: updatedClass.dates }), {
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
    const { classCode } = params;
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
        const updatedClass = await Class.findOneAndUpdate(
            { classCode: classCode },
            { $pull: { dates: new Date(date) } }, 
            { new: true } 
        );

        if (!updatedClass) {
            return new Response(JSON.stringify({ message: 'Class not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: 'Date removed successfully', dates: updatedClass.dates }), {
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
