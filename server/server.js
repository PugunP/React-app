const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require("./routes/blog")
const authRoute = require("./routes/auth")


const app = express()
const port = process.env.PORT || 8080


//connect cloud database
// mongoose.connect(process.env.DATABASE,{
//     useNewUrlParser:true,
//     useUnifiedtopology:false
// }).then(()=>console.log("เชื่อมต่อเรียบร้อย"))
// .catch((err)=>console.log(err))
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("เชื่อมต่อเรียบร้อย"))
.catch((err) => {
    console.error("Database connection error:", err);
});


//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


//route
app.use('/api',blogRoute)
app.use('/api',authRoute)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });