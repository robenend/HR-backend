const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')
const cors = require('cors');

const employeeRouter = require('./routers/employee')
const positionRouter = require('./routers/position')
const recruitmentRouter = require('./routers/recruitment')
const otherRouter = require('./routers/other')
const fileRouter = require('./routers/fileUpload')
const requestLogger = require('./middleware/requestLogger') 


const app = express()

app.use(requestLogger)
app.use(cors());

 const port = process.env.port || 3500
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

 app.listen(port , ()=>{
    console.log(`running at ${port}`)
 })

 