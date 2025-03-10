import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config"

import ConnectDB from "./config/dbconfig.js"

import authMiddleware from './Middleware/authMiddleware.js'

import UserRoute from "./Routes/UserRoute.js"
import CourseRoute from "./Routes/CourseRoute.js"
import EnrollRoute from "./Routes/EnrollRoute.js"


const app = express();

app.use(cors());
app.use(bodyParser.json());

ConnectDB();



app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.use('/api/users', UserRoute);
app.use('/api/courses' ,CourseRoute);
// app.use('/api/courses' ,authMiddleware,CourseRoute);
app.use('/api/enroll' ,EnrollRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})