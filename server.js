var express = require("express"),
morgan = require("morgan"),
mongoose = require("mongoose"),
router = express.Router(),
User = require("./app/model/user.js"),
bodyParser = require("body-parser"),
api = require("./app/routes/api.js")(router),
manage = require("./app/routes/manageRoutes.js"),
path = require("path"),
app = express()


//===================================config===============================//
app.use(express.static(__dirname + "/public"))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.connect("mongodb://teamdraftbox:123vishnu@ds137643.mlab.com:37643/management")
//===============================routes=================================//
app.use("/api",api)
app.use(manage)
app.use("/",function(req,res){
    res.sendFile(path.join(__dirname + "/public/app/views/index.html"))
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("connectec to zeta server")
})
