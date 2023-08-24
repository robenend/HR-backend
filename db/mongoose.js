const mongoose = require("mongoose")

const Url = "mongodb+srv://root:root@cluster0.vqgrk7q.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(Url , {useNewUrlParser : true  })