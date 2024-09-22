import Attendance from "/app/models/attendance"; 
// 
export async function GET(req) {

    try {
        console.log('Collection being accessed:', Attendance.collection.name);
        const attendanceData = await Attendance.find({});
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
