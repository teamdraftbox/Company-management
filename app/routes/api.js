
var User = require("../model/user")
var jwt = require('jsonwebtoken');

const secret = "harryPotter"

module.exports = function (router){
    
    router.post("/user",function(req,res){
    var user = new User()
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if(req.body.username === null || 
    req.body.username === "" || 
    req.body.password === null || 
    req.body.password === "" || 
    req.body.email === "" || 
    req.body.email === null){
        
    res.json({success:false,message:"invalid data"})
    }else{
    
    user.save(function(err){
        if(err){
            res.json({success:false,message:"User already exsist"})
        }else{
            res.json({success:true,message:"Succesfully registered"})
        }
    })
    }
  
})

router.post("/authenticate",function(req,res){
    User.findOne({username: req.body.username}).select("email password username").exec(function(err,user){
        if(err){console.log("error")}
        if(!user){
            res.json({success:false,message:"user not in database"})
        }else if(user){
            var valid = user.comparePassword(req.body.password)
            if(valid)
            {   
                var token = jwt.sign(
                    {username:user.username,email:user.email}, secret, { expiresIn: '24h' }
                    );
                
                res.json({success:true,message:"Successfully authenticated",token:token})
            }
            else{
                  res.json({success:false,message:"Wrong password or usrname"})
            }
        }
    })
})

router.use(function(req,res,next){
 var token = req.body.token || req.body.query || req.headers["x-access-token"]
 if(token){
        jwt.verify(token, secret, function(err, decoded) {
       if(err){res.json({success:false,message:"token not provided"})}else{
           req.decoded = decoded
           next()
       }
        });
       
 }else{
     res.json({success:false,message:"token not provided"})
 }
   
})
router.post("/userdata",function(req,res){
    res.send(req.decoded)
})
return router
}



