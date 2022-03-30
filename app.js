const express = require("express")
const mongoose = require("mongoose")
const Group = require("./models/groups")
const methodOverride = require("method-override")

mongoose.connect("mongodb://localhost/my-chama").then(()=>{
    console.log("DB CONNECTED")
})

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.set("view engine" , "ejs")

const categories = ["50" , "100" , "200" , "500" , "1000"]

app.get("/groups" , async(req, res)=>{

    const groups = await Group.find({})

    res.render("groups/index" , {groups})

})

app.get("/" , (req,res)=>{
    res.render("index")
})

app.get("/groups/new" , (req,res)=>{
    res.render("groups/new" , {categories})
})

app.post("/groups", async(req,res)=>{

    const newData = new Group(req.body)

    await newData.save().then((data)=>{
        console.log(data)
        res.redirect("/groups")
    })

})



app.get("/groups/:id" , async (req,res)=>{
    const{id} = req.params
    const foundData = await Group.findById(id)
    res.render("groups/show" , {foundData})
})

app.get("/groups/:id/edit" , async(req,res)=>{
    const {id} = req.params
    const foundGroup = await Group.findById(id)
    res.render("groups/edit" , {foundGroup , categories})
})

app.put("/groups/:id" , async (req,res)=>{
    const {id} = req.params

    const update = await Group.findByIdAndUpdate(id)

    res.redirect(`/groups/${update._id}`)
})

app.delete("/groups/:id" , async(req,res)=>{
    const {id} = req.params

    const deleted = await Group.findByIdAndDelete(id)

    res.redirect("/groups")
})
app.listen(3000, ()=>{
    console.log("Server Started On Port 3000")
})