var mongoose = require("mongoose")
var manageSchema = new mongoose.Schema({
    companyName:String,
    managerName:String,
    companyImage:String,
    email:String,
    detail:String
})

var Manage = mongoose.model("Manage",manageSchema)

module.exports = Manage