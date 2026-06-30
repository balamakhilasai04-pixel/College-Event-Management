
const express =
require("express");

const cors =
require("cors");

const mongoose =
require("mongoose");

const Event =
require("./models/Event");

const Registration =
require("./models/Registration");

const Announcement =
require(
"./models/Announcement"
);

const Review =
require("./models/Review");

const User =
require("./models/User");

require("dotenv")
.config();

const app =
express();

console.log(
"THIS IS SRC SERVER"
);

console.log(
process.env.JWT_SECRET
);


// Middleware
app.use(cors());

app.use(
express.json()
);


// MongoDB Connection
mongoose
.connect(
process.env.MONGO_URI
)
.then(() => {

console.log(
"MongoDB Connected"
);

})
.catch((error) => {

console.log(error);

});


// Routes
const authRoutes =
require(
"./routes/authRoutes"
);

const eventRoutes =
require(
"./routes/eventRoutes"
);
const registrationRoutes =
require(
"./routes/registrationRoutes"
);


// Route Middleware
app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/events",
eventRoutes
);
app.use(
"/api/registrations",
registrationRoutes
);


// Home Route
app.get(
"/",
(req, res) => {

res.send(
"Server Started"
);

});


// Test Route
app.get(
"/test",
(req, res) => {

console.log(
"TEST HIT"
);

res.send(
"OK TEST WORKS"
);

});


// Test API Route
app.get(
"/api/test",
(req, res) => {

res.json({

message:
"API Working"

});

});


// Test POST Route
app.post(
"/test",
(req, res) => {

res.json({

success:true,

message:
"POST works"

});

});
app.get(
"/api/dashboard/:email",

async (req, res) => {

try {

const email =
req.params.email;


const totalEvents =
await Event.countDocuments();


const upcomingEvents =
await Event.countDocuments({
date: {
$gte: new Date()
}
});


const user =
await User.findOne({
email
});

let totalRegistrations;

if(
user.role ===
"organizer"
){

totalRegistrations =
await Registration.countDocuments();

}
else{

totalRegistrations =
await Registration.countDocuments({
userEmail: email
});

}


res.json({
totalEvents,
upcomingEvents,
totalRegistrations
});

}
catch (error) {

console.log(error);

res.status(500).json({
message:
"Dashboard error"
});

}

}
);
app.post(
"/api/events",

async(req,res)=>{

try{

const newEvent =
new Event(req.body);

await newEvent.save();

res.status(201).json({

message:
"Event Created Successfully"

});

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Error Creating Event"

});

}

});
app.get(
"/api/events",

async(req,res)=>{

try{

const events =
await Event.find();

res.status(200).json(
events
);

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to Fetch Events"

});

}

});
app.post(
"/api/registrations",

async(req,res)=>{

try{

const {

eventId,
eventName,
userName,
userEmail,
phone

} = req.body;
const existingRegistration =
await Registration.findOne({

eventId,
userEmail

});

if(existingRegistration){

return res.status(400).json({

message:
"You have already registered for this event"

});

}


const registration =
new Registration({

eventId,
eventName,
userName,
userEmail,
phone,

registrationDate:
new Date()

});


await registration.save();

res.status(201).json({

message:
"Registered Successfully"

});

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Registration Failed"

});

}

});
app.get(
"/api/registrations",

async(req,res)=>{

try{

const registrations =
await Registration.find();

res.status(200).json(
registrations
);

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to load registrations"

});

}

});
app.delete(
"/api/registrations/:id",

async(req,res)=>{

try{

await Registration.findByIdAndDelete(

req.params.id

);

res.status(200).json({

message:
"Registration Deleted"

});

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Delete Failed"

});

}

});

// Create Announcement

app.post(
"/api/announcements",

async(req,res)=>{

try{

const announcement =
new Announcement(
req.body
);

await announcement.save();

res.status(201).json({

message:
"Announcement Created"

});

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Failed"

});

}

});



// Get Announcements

app.get(
"/api/announcements",

async(req,res)=>{

try{

const announcements =
await Announcement.find()

.sort({
createdAt:-1
});

res.json(
announcements
);

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Failed"

});

}

});

// Create Review

app.post(
"/api/reviews",

async(req,res)=>{

try{

const review =
new Review(
req.body
);

await review.save();

res.status(201).json({

message:
"Review Added"

});

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Failed"

});

}

});

// Get Reviews

app.get(
"/api/reviews/:eventId",

async(req,res)=>{

try{

const reviews =
await Review.find({

eventId:
req.params.eventId

});

res.json(
reviews
);

}
catch(error){

console.log(error);

res.status(500).json({

message:
"Failed"

});

}

});


// Start Server
app.listen(
5000,
() => {

console.log(
"Server Started on Port 5000"
);

});