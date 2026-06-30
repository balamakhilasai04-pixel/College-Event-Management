const mongoose =
require("mongoose");

const registrationSchema =

new mongoose.Schema({

eventId:{
type:String,
required:true
},

eventName:{
type:String,
required:true
},

userName:{
type:String,
required:true
},

userEmail:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

registrationDate:{
type:Date,
default:Date.now
}

});


module.exports =

mongoose.model(
"Registration",
registrationSchema
);