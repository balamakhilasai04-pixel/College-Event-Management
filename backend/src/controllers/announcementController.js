const Announcement =
require(
"../models/Announcement"
);

const createAnnouncement =
async(req,res)=>{

try{

const announcement =
new Announcement(
req.body
);

await announcement.save();

res.status(201).json({

message:
"Announcement Created",

announcement

});

}
catch(error){

res.status(500).json({

message:
error.message

});

}

};

const getAnnouncements =
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

res.status(500).json({

message:
error.message

});

}

};

const deleteAnnouncement =
async(req,res)=>{

try{

await Announcement.findByIdAndDelete(
req.params.id
);

res.json({

message:
"Announcement Deleted"

});

}
catch(error){

res.status(500).json({

message:
error.message

});

}

};

module.exports = {

createAnnouncement,
getAnnouncements,
deleteAnnouncement

};