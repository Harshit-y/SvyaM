import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path'; // <-- Import path module
import { fileURLToPath } from 'url'; // <-- Import url module

dotenv.config();

// ES Module way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", userRoutes)
app.use('/api/complaints', complaintRoutes);

// --- Make 'uploads' folder static ---
// This line serves files from the 'uploads' directory
// under the '/uploads' URL path.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.listen(PORT, () => {
    console.log(`Server is ready at port ${PORT}`)
})