import { config } from '@/config/env'
import mongoose from 'mongoose'

export async function connectDB(){
    try {
        const connect = await mongoose.connect(config.MONGODB_URI as string)
        console.log('mongodb connected')
    } catch (error:any) {
        console.log(error)
        process.exit(1)
    }
}


