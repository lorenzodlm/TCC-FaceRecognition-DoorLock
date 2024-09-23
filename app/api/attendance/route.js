import Attendance from "/app/models/attendance";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const classID = searchParams.get('classId'); 
        const UserID = searchParams.get('studentId'); 

        if (!classID || !UserID) {
            return new Response(
                JSON.stringify({ error: "classId and studentId are required" }),
                { status: 400 }
            );
        }

        const attendanceData = await Attendance.find({
            classID: classID, 
            UserID: UserID,    
        });

        console.log("Attendance Data:", attendanceData);

        return new Response(JSON.stringify(attendanceData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
