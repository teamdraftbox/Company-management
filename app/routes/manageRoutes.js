var express = require("express")
var app = express.Router({mergeParams:true})
var Manage = require("../model/manage.js")




//campsite route///////////////////////////////////
app.get("/manage/management",function(req,res){
    Manage.find({},function(err,manage){
        if(err){
            res.json({success:false,message:"unable to find data"})
        }else{
            res.json({success:true,message:"Succesfully obatined data", data:manage})
        }
    })
})
    
    
app.get("/manage/management/:id",function(req,res){
    Manage.findById(req.params.id,function(err,data){
        if(err){res.json({success:false,message:"unable to find data"})}else{
        res.json({success:true,message:"Succesfully obatined data", data:data})
        }
    })
})
//post the data to database///////////////////
app.post("/manage/management",function(req,res){
    var obj = {
        companyName:req.body.companyName,
        companyImage:req.body.companyImage,
        managerName:req.body.managerName,
        email:req.body.email
    }
Manage.create(obj,function(err,management){
  if(err){
      res.json({success:false,message:"unable to find data"})
  }else{
       res.json({success:true,message:"Succesfully added data", data:management})
  }
})
 })

//edit and update the campsite///////////////////

app.put("/manage/management/:id",function(req,res){
   var obj = {
        companyName:req.body.companyName,
        companyImage:req.body.companyImage,
        managerName:req.body.managerName,
        email:req.body.email,
        detail:req.body.detail,
        id:req.body.id
    }
    Manage.findByIdAndUpdate(obj.id,obj,function(err,managment){
        if(err){
             res.json({success:false,message:"unable to find data"})
        }else{
            res.json({success:true,message:"Succesfully obatined data", data:managment})
        }
    })

})
//delete the route/////////////////////////////////////
app.delete("/manage/management/:id",function(req,res){
    Manage.findByIdAndRemove(req.params.id,function(err,body){
        if(err){res.json({success:false,message:"unable to delete data"})}else{
            res.json({success:true,message:"successfully deleted data"})
        }
    })
})


module.exports = app