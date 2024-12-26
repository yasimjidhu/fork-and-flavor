import dotenv from 'dotenv'
dotenv.config()

export const  config = {
    DB_URI:process.env.MONGO_URI,
    PORT:process.env.PORT
}

