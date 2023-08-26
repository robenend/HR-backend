const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const employeeRouter = require('./routes/employee')
const positionRouter = require('./routes/position')
const recruitmentRouter = require('./routes/recruitment')
const otherRouter = require('./routes/other')
const payrollRoute = require('./routes/payroll')
const fileRouter = require('./routes/fileUpload')
const requestLogger = require('./middleware/requestLogger') 
const verifyJWT = require('./middleware/verifyJWT') 
const authRouter = require('./routes/auth')
const credentials = require('./middleware/credentials')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config();

app.use(requestLogger)

 const port = process.env.port || 5000;

app.use(express.json())
// app.use(verifyJWT);
// app.use(userRouter)
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/register', require('./routes/register'));

app.use(employeeRouter)
app.use(payrollRoute)
app.use(positionRouter)
app.use(recruitmentRouter)
app.use(otherRouter)
app.use(fileRouter)

app.listen(port , ()=>{
    console.log(`running at ${port}`)
 })

 