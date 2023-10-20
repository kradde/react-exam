import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/posts.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);
app.use(express.json());
app.use('/api', userRoutes);

// routes
app.get('/', (req, res) => {
    res.send('React exam API');
});

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));

app.listen(port, console.log('server listening on port', port));
