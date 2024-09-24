import User from "/app/models/user";

export async function POST(req) {
    try {
        const { userId, currentPassword, newPassword } = await req.json();

        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        if (user.password !== currentPassword) {
            return new Response(JSON.stringify({ error: "Incorrect current password" }), { status: 400 });
        }

        user.password = newPassword;
        await user.save();

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to change password" }), { status: 500 });
    }
}
