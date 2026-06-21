import connectDB from "./database/db.connect.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config()

connectDB()
    .then(() => {
        app.listen(8000, () => {
            console.log('App listening on port 8000');
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed !!! ", error);
    });
