import User from "/app/models/user";

export async function POST(req) {
    try {
        const { id, name, email, password, role } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
        }

        const newUser = new User({ id, name, email, password, role });
        await newUser.save();

        return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to add user" }), { status: 500 });
    }
}
