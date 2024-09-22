import { dbConnect } from '/app/lib/db';
import Classes from '/app/models/class'; // Import your Classes model

// API handler for fetching classes
export async function GET(req) {
    try {
        // Connect to the database
        // await dbConnect();

        // Extract query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const teacherId = searchParams.get('teacherId');
        const classCode = searchParams.get('code');

        let classes;

        // Fetch classes by teacherId or classCode, or fetch all if no query params
        if (teacherId) {
            classes = await Classes.find({ teacherId });
        } else if (classCode) {
            classes = await Classes.find({ name: { $regex: classCode, $options: 'i' } }); // case-insensitive search
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

// API handler for creating a class
export async function POST(req) {
    try {
        const body = await req.json();
        const newClass = await Classes.create(body);
        return new Response(JSON.stringify(newClass), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error creating class', error }), { status: 500 });
    }
}
