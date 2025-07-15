const express = require("express")
const cors = require("cors");
const app = express()
require("dotenv").config();

const connectDB = require("./config/db")
connectDB();

app.use(cors());
app.use(express.json())

const authRoutes = require('./routes/authroutes')
app.use('/api/auth', authRoutes)

const userRoutes = require('./routes/userroutes')
app.use('/api/user', userRoutes)

const eventRoutes = require('./routes/eventroutes')
app.use('/api/events', eventRoutes)

const registrationRoutes = require('./routes/registrationroutes')
app.use('/api/registration', registrationRoutes)

const attendanceRoutes = require('./routes/attendanceroutes')
app.use('/api/attendance', attendanceRoutes)

const certificateRoutes = require('./routes/certificateroutes')
app.use('/api/certificates', certificateRoutes)

const uploadRoutes = require('./routes/uploadroutes')
app.use('/api/upload', uploadRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running on port 3000")
});