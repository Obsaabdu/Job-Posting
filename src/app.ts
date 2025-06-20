import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes';

dotenv.config();


const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get("/", (_, res) => {
    res.send("Api running");
});

export default app;