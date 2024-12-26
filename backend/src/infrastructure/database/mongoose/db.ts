import mongoose from "mongoose";
import {config} from '../../../config/env'

const connectDB = async ()=>{
    try {
        await mongoose.connect(config.DB_URI as string)
        console.log('mongodb connected')
    } catch (error:any) {
        console.error('Error connecting to mongodb',error)
        process.exit(1)
        
    }
}

export default connectDB