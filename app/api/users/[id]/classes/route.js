import User from "@/app/models/user"; 

export async function POST(req, { params }) {
    const { id } = params; 
    const { classCode } = await req.json(); 

    try {
        const user = await User.findOneAndUpdate(
            { id },
            { $addToSet: { classIds: classCode } }, 
            { new: true } 
        );

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error adding class:", error);
        return new Response(JSON.stringify({ error: "Failed to add class" }), { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    const { id } = params; 
    const { classId } = await req.json();

    try {
        const user = await User.findOneAndUpdate(
            { id }, 
            { $pull: { classIds: classId } },
            { new: true } 
        );

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error removing class:", error);
        return new Response(JSON.stringify({ error: "Failed to remove class" }), { status: 500 });
    }
}
