import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigins = ['http://localhost:5173',
    'https://job-portal-frontend-mouc.onrender.com'];
const corsOptions= {
     origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow if the origin is in the list
    } else {
      callback(new Error('Not allowed by CORS')); // Deny other origins
    }
  },
   
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);



app.listen(PORT , ()=>{
    connectDB();
     console.log(`Server running at port ${PORT}`);
})
