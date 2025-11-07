import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
    const url = await connectDB();
    return Response.json({ url: url});
}