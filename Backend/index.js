import express from "express";
import {PORT, MongoDBURL} from './config.js';
import mongoose from "mongoose";
import booksRoute from './routes/bookRoutes.js'
import cors from 'cors';

const app = express();

//Middleware to parse body
app.use(express.json());

//Middleware to handle CORS policy
app.use(cors());

app.get('/',(req, res) => {
    return res.status(234).send('Welcome To BookStore');
});

//Middleware to handle all Routes
app.use('/books', booksRoute);

mongoose
    .connect(MongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT,() => {
            console.log(`Server started at port : ${PORT}`)
        });
        
    })
    .catch((error) => {
        console.log(error);
    });