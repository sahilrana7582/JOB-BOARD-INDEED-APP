const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./database/dbConnect');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
// const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const jobRouter = require('./routes/jobRoutes');
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1',
      'https://job-board-indeed-app.vercel.app',
      'https://job-board-indeed-app-git-main-sahilrana27582s-projects.vercel.app',
      'https://job-board-indeed-app-sahilrana27582s-projects.vercel.app',
    ],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.json());
// app.use(morgan('dev'));

const PORT = process.env.PORT;
dbConnect();

app.use('/api/user', userRouter);
app.use('/api/job', jobRouter);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
