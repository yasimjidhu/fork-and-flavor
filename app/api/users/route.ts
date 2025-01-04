import User from "@/app/models/user";
import { connectDB } from "@/utils/mongodb";

export async function GET() {
    try {
        await connectDB()
        const users = await User.find()
        return new Response(JSON.stringify(users), {
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error)
            return new Response('Failed to fetch users', { status: 500 })
        }
    }
}

export async function POST(req: Request) {
    try {

        const { name, email, password } = await req.json()
        await connectDB()

        // instantiate a new user
        const newUser = await new User({ name, email, password })

        // save the new user to the database
        await newUser.save()

        return new Response(JSON.stringify({ message: 'User created' }), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response('Failed to create user', { status: 500 })
    }
}