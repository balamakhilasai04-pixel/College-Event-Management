const Registration =
require("../models/Registration");
const Event =
require("../models/Event");

const createEvent =
async (req, res) => {

try{

const event =
new Event(req.body);

await event.save();

res.status(201)
.json({

message:
"Event Created",

event

});

}
catch(error){

res.status(500)
.json({
message:
error.message
});

}

};
const getAllEvents =
async (req, res) => {

try{

const events =
await Event.find();

res.json(events);

}
catch(error){

res.status(500)
.json({
message:
error.message
});

}

};


// UPDATE EVENT

const updateEvent =
async(req,res)=>{

try{

const updatedEvent =
await Event.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.status(200).json({

message:
"Event Updated Successfully",

updatedEvent

});

}
catch(error){

res.status(500).json({

message:
"Update Failed"

});

}

};

// DELETE EVENT

const deleteEvent =
async(req,res)=>{

try{

await Event.findByIdAndDelete(
req.params.id
);

// DELETE ALL REGISTRATIONS
// OF THIS EVENT

await Registration.deleteMany({

eventId:req.params.id

});

res.status(200).json({

message:
"Event Deleted Successfully"

});

}
catch(error){

res.status(500).json({

message:
"Delete Failed"

});

}

};
module.exports = {
createEvent,
getAllEvents,
updateEvent,
deleteEvent
};