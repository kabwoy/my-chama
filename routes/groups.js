const express = require("express")
const Group = require("../models/groups")
const categories = ["50" , "100" , "200" , "500" , "1000"]
const router = express.Router()

router.get("/groups" , async(req, res)=>{

    const groups = await Group.find({})

    res.render("groups/index" , {groups})

})

router.get("/groups/new" , (req,res)=>{
    res.render("groups/new" , {categories})
})

router.post("/groups", async(req,res)=>{

    const newData = new Group(req.body)

    await newData.save().then((data)=>{
        console.log(data)
        res.redirect("/groups")
    })

})

router.get("/groups/:id" , async (req,res)=>{
    const{id} = req.params
    const foundData = await Group.findById(id)
    res.render("groups/show" , {foundData})
})

router.get("/groups/:id/edit" , async(req,res)=>{
    const {id} = req.params
    const foundGroup = await Group.findById(id)
    res.render("groups/edit" , {foundGroup , categories})
})

router.put("/groups/:id" , async (req,res)=>{
    const {id} = req.params

    const update = await Group.findByIdAndUpdate(id, req.body)

    console.log(update)

    res.redirect(`/groups/${update._id}`)
})

router.delete("/groups/:id" , async(req,res)=>{
    const {id} = req.params

    const deleted = await Group.findByIdAndDelete(id)

    res.redirect("/groups")
})

module.exports = router