const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')
const cors = require('cors');

const employeeRouter = require('./routes/employee')
const positionRouter = require('./routes/position')
const recruitmentRouter = require('./routes/recruitment')
const otherRouter = require('./routes/other')
const fileRouter = require('./routes/fileUpload')
const requestLogger = require('./middleware/requestLogger') 
const authRouter = require('./routes/auth')

const app = express()

app.use(requestLogger)
app.use(cors());

 const port = process.env.port || 5000;
 app.use(
   express.urlencoded({ extended: true })
);

app.use(express.json())


// app.use(userRouter)
app.use(employeeRouter)
app.use(positionRouter)
app.use(recruitmentRouter)
app.use(otherRouter)
app.use(fileRouter)
app.use(authRouter)
app.listen(port , ()=>{
    console.log(`running at ${port}`)
 })

 