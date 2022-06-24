const mongoose = require("mongoose")
const Schema = mongoose.Schema

var adminSchema = new Schema ({
kullanici_adi:{
type:String,
require:true,
},
gmail:{
type:String,
require:true,
},
sifre:{
type:String,
require:true,
},
})

var admin = mongoose.model('Admin', adminSchema)
module.exports = admin
