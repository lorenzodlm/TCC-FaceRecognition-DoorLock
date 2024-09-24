import Attendance from "/app/models/attendance";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const classID = searchParams.get('classId');
        const UserID = searchParams.get('studentId'); // Optional student ID

        if (!classID) {
            return new Response(
                JSON.stringify({ error: "classId is required" }),
                { status: 400 }
            );
        }

        let attendanceData;

        if (UserID) {
            // Fetch attendance for the specific student in the class
            attendanceData = await Attendance.find({
                classID: classID,
                UserID: UserID,
            });
        } else {
            // Fetch attendance for all students in the class
            attendanceData = await Attendance.find({
                classID: classID,
            });
        }

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
