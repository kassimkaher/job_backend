import express from "express";
import dotenv from 'dotenv';
import router from './route/routerIndex'


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/api",router);

const oneDay = 1000 * 60 * 60 * 24 * 300;

// app.use(database);
app.listen(8000,()=>{
console.log("server is start");
});



