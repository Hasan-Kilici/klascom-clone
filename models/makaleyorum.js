const mongoose = require("mongoose")
const Schema = mongoose.Schema

var makaleyorumSchema = new Schema({
kullanici_adi:{
type : String,
require : true,
},
mesaj:{
type: String,
require: true,  
},
makale:{
type:String,
require : true,
},
makaleId:{
type : String,
require : true,
},
}, {timestamps:true})

var makaleyorum = mongoose.model('Makaleyorum', makaleyorumSchema)
module.exports = makaleyorum
