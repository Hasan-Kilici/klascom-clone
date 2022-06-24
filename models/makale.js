const mongoose = require("mongoose")
const Schema = mongoose.Schema

var makaleSchema = new Schema({
title:{
type : String,
require : true,
},
short:{
type: String,
require: true,  
},
long:{
type : String,
require : true,
},
longdesc:{
type : String,
require : true,  
},
foto1:{
type : String,
require : true,
},
foto2:{
type : String,
require : true,
},
goruntulenme:{
type:Number,
require:true
},
ekleyen:{
type:String,
require:true,
},
ornek1:{
type:String,
require:true,
},
ornek2:{
type:String,
require:true,
},
ornek3:{
type:String,
require:true,
},
upvote:{
type: Number,
require : true,
},
downvote:{
type : Number,
require : true,
},
}, {timestamps:true})

var makale = mongoose.model('Makale', makaleSchema)
module.exports = makale
