import User from '/app/models/user';

// API handler for fetching users
export async function GET(req) {
    try {


        // Extract query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const _id = searchParams.get('id');
        const role = searchParams.get('role');
        const name = searchParams.get('name');
        const userID = searchParams.get('userID')

        let users;
        
        if (_id) {
            users = await User.findById(_id);
            if (!users) {
                return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
            }
            return new Response(JSON.stringify(users), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // Fetch users by role or name, or fetch all if no query params
        if (userID) {
            users = await User.find({ id: userID }); // Search by userID
        } else if (role) {
            users = await User.find({ role });
        } else if (name) {
            users = await User.find({ name: { $regex: name, $options: 'i' } });
        } else {
            users = await User.find({});
        }

        return new Response(JSON.stringify(users), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error fetching users', error: error.message }),
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
        const newUser = await User.create(body);
        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error creating user', error }), { status: 500 });
    }
}
