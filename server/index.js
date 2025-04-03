const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/authRouter');
const userRouter = require('./src/routes/userRouter');
const examRouter = require('./src/routes/examRouter');
const bodyParser = require('body-parser');
const connectDB = require('./src/configs/connectDB');
const PORT = process.env.PORT || 8080;
// middlewares
app.use(cookieParser());
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
// router
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/exams', examRouter);
app.get('/', (req, res) => {
    res.send('new Hello World');
})
// connect to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})


