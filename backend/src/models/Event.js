const mongoose =
require("mongoose");

const eventSchema =
new mongoose.Schema({

title: {
type: String,
required: true
},

image:{
type:String,
default:""
},

category: {
type: String
},

mode: {
type: String
},

banner: {
type: String
},

description: {
type: String
},

highlights: {

type: [String],

default: []

},
importantDetails: {
type: String
},

whyJoin: {
type: String
},

date: {
type: String
},

time: {
type: String
},

venue: {
type: String
},

registrationFee: {
type: Number,
default: 0
},

teamFee: {
type: Number,
default: 0
},

coordinatorName: {
type: String
},

coordinatorPhone: {
type: String
},

certificate: {
type: Boolean,
default: false
},

food: {
type: Boolean,
default: false
},

prize: {
type: Boolean,
default: false
},

createdAt: {
type: Date,
default: Date.now
},

capacity: {
type:Number,
required:true
}

});

module.exports =
mongoose.model(
"Event",
eventSchema
);