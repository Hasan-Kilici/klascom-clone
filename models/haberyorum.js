const mongoose = require("mongoose")
const Schema = mongoose.Schema

var haberyorumSchema = new Schema({
kullanici_adi:{
type : String,
require : true,
},
mesaj:{
type: String,
require: true,  
},
haber:{
type: String,
require : true,
},
haberId:{
type : String,
require : true,
},
}, {timestamps:true})

var haberyorum = mongoose.model('Haberyorum', haberyorumSchema)
module.exports = haberyorum
