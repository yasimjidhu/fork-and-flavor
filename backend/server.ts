import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import connectDB from "./src/infrastructure/database/mongoose/db";
import recipeRoutes from "./src/presentation/routes/recipeRoutes";
import { config } from "./src/config/env";

const app = express();
const PORT = config.PORT || 5000;

// Connect to MongoDB
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
};

app.use((req,res,next)=>{
    console.log(`req method : ${req.method} req url : ${req.url}`)
    next()
})

// Middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

// Routes
app.use("/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
