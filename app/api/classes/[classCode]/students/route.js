import Class from "@/app/models/class"; // Adjust this import to your class model path

export async function POST(req, { params }) {
    const { classCode } = params; // This is your class code
    const { studentId } = await req.json(); // Get the student ID from the request body

    console.log("Received classCode:", classCode); // Debugging output
    console.log("Received studentId:", studentId);

    try {
        // Find the class by classCode and add the studentId
        const classData = await Class.findOneAndUpdate(
            { classCode }, // Search using the classCode
            { $addToSet: { studentIDs: studentId } }, // Corrected to studentIDs
            { new: true } // Return the updated class
        );

        if (!classData) {
            return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(classData), { status: 200 });
    } catch (error) {
        console.error("Error adding student to class:", error);
        return new Response(JSON.stringify({ error: "Failed to add student to class" }), { status: 500 });
    }
}
