import Location from '@/app/models/location'; 

export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url);
        const managerID = searchParams.get('managerId');
        const locationID = searchParams.get('locationID'); 
        const employeeID = searchParams.get('employeeID'); 

        let location;

        if (managerID) {
            location = await Location.find({ managerID });
        } else if (locationID) {
            location = await Location.find({ locationID: locationID }); 
        } else if (employeeID) {
            location = await Location.find({ employeeIDs: employeeID }); 
        } else {
            location = await Location.find({}); 
        }

        return new Response(JSON.stringify(location), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error fetching location', error: error.message }),
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
        const newLocation = await Location.create(body); 
        return new Response(JSON.stringify(newLocation), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error creating location', error }), { status: 500 });
    }
}
