const mongoose = require("mongoose")
const Schema = mongoose.Schema

var banliSchema = new Schema ({
ip:{
type:String,
require:true,
},
})

var banli = mongoose.model('Banli', banliSchema)
module.exports = banli
