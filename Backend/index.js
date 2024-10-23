import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoute from '../backend/routes/taskRoute.js'
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

dotenv.config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;

try {
  mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected...");
} catch (err) {
  console.log(err);
}

app.use('/task',taskRoute)
app.listen(PORT, () => console.log(PORT));
