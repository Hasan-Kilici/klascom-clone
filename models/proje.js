const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var projelerSchema = new Schema ({
title:{
type : String,
require : true,
},
short:{
type : String,
require : true,  
},
long:{
type : String,
require : true,
},
longdesc:{
type : String,
require : true,
},
link:{
type : String,
require : true,
},
goruntulenme:{
type : Number,
require: true,
},
sahibi:{
type:String,
require:true,
}
},{timestaps:true});
var proje = mongoose.model('proje',projelerSchema);

module.exports = proje;
