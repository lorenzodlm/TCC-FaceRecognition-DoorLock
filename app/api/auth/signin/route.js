import User from '/app/models/user';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
        }

        return new Response(JSON.stringify({ _id: user._id, id: user.id,role: user.role }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error during sign in', error: error.message }), { status: 500 });
    }
}
