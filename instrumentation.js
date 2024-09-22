import dbConnect from "/app/lib/db";

export async function register() {
    console.log("Connecting to database...");
    await dbConnect();
}
