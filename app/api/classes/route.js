import Classes from '/app/models/class'; 

export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url);
        const teacherID = searchParams.get('teacherId');
        const classCode = searchParams.get('classCode'); 
        const studentID = searchParams.get('studentId'); 

        let classes;

        if (teacherID) {
            classes = await Classes.find({ teacherID });
        } else if (classCode) {
            classes = await Classes.find({ classCode: classCode }); 
        } else if (studentID) {
            classes = await Classes.find({ studentIDs: studentID }); 
        } else {
            classes = await Classes.find({}); 
        }

        return new Response(JSON.stringify(classes), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error fetching classes', error: error.message }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
}


export async function POST(req) {
    try {
        const body = await req.json();
        const newClass = await Classes.create(body); 
        return new Response(JSON.stringify(newClass), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error creating class', error }), { status: 500 });
    }
}
