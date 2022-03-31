const express = require("express")
const mongoose = require("mongoose")
const Group = require("./models/groups")
const methodOverride = require("method-override")
const path = require("path")
const groupsRoutes = require("./routes/groups")
const defaultRoutes = require("./routes/default")

mongoose.connect("mongodb://localhost/my-chama").then(()=>{
    console.log("DB CONNECTED")
})



const app = express()

app.use(express.urlencoded({extended:true}))
app.use("/public", express.static(__dirname + "/public"));
app.use(methodOverride('_method'))
app.set("view engine" , "ejs")
app.use("/" , groupsRoutes)
app.use(defaultRoutes)



app.listen(3000, ()=>{
    console.log("Server Started On Port 3000")
})