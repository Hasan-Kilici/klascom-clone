const mongoose = require("mongoose")
const Schema = mongoose.Schema

var kullaniciSchema = new Schema ({
ip :{
type:String,
require:true,
},
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
newId:{
type:String,
require:true
}
})

var kullanici = mongoose.model('Kullanici', kullaniciSchema)
module.exports = kullanici
