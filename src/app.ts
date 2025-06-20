import express from "express";
import dotenv from "dotenv";
import * as db from "./config/db.ts";

dotenv.config();
db.connectDB();

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Api running");
});

export default app;