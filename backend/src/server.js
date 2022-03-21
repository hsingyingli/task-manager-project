import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import credentials from './middlewares/credentials.js';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js'
import refreshTokenRouter from './routes/refreshToken.js'

const app = express();
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true
};

// ROUTES

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/refresh', refreshTokenRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is listening')
})

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
}, () => {
  console.log('connect to DB')
})
