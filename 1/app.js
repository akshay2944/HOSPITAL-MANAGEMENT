import express from "express";
import userRouter from "./router/router.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors(
    {
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());


// middleware (WITHOUT THIS → req.body = undefined → everything breaks quietly)
app.use(express.json());

// routes
app.use("/api/users", userRouter);

export default app;

