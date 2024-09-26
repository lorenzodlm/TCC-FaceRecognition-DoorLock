import Class from "/app/models/class"; 

export async function POST(req) {
    try {
        const { className, classCode, teacherID, studentIDs, dates } = await req.json();

        const existingClass = await Class.findOne({ classCode });
        if (existingClass) {
            return new Response(JSON.stringify({ error: "Class code already exists" }), { status: 400 });
        }

        const newClass = new Class({ className, classCode, teacherID, studentIDs, dates });
        await newClass.save();

        return new Response(JSON.stringify({ success: true, class: newClass }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to add class" }), { status: 500 });
    }
}
