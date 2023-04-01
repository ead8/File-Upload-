import express from "express"
import fileRouter from "./router/fileRouter"
import File  from './model/fileModel'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


import cors from "cors"
import path from "path"
const app = express()


app.use(express.json())

const PORT = process.env.port || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/",fileRouter)
app.listen(PORT,()=>console.log(`Server started on ${PORT}`))