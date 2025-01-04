import { config } from '@/config/env'
import mongoose from 'mongoose'

export async function connectDB(){
    try {
        await mongoose.connect(config.MONGODB_URI as string)
        console.log('mongodb connected')
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error)
            process.exit(1)
        }
    }
}


