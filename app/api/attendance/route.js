import Attendance from "/app/models/attendance";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const locationID = searchParams.get('locationID');
        const UserID = searchParams.get('employeeID'); // Optional employee ID

        if (!locationID) {
            return new Response(
                JSON.stringify({ error: "locationID is required" }),
                { status: 400 }
            );
        }

        let attendanceData;

        if (UserID) {
            // Fetch attendance for the specific employee in the location
            attendanceData = await Attendance.find({
                locationID: locationID,
                UserID: UserID,
            });
        } else {
            // Fetch attendance for all employees in the location
            attendanceData = await Attendance.find({
                locationID: locationID,
            });
        }

        // console.log("Attendance Data:", attendanceData);

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
