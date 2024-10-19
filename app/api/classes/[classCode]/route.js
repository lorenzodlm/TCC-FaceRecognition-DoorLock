import Class from "@/app/models/class"; 

export async function GET(req, { params }) {
    const { classCode } = params; 

    try {
        const classDetails = await Class.findOne({ classCode });

        if (!classDetails) {
            return new Response(JSON.stringify({ message: "Class not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(classDetails), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching class details:", error);
        return new Response(
            JSON.stringify({ message: 'Error fetching class details', error: error.message }),
            { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
    }
}
