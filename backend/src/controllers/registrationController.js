const Registration =
require(
"../models/Registration"
);


// REGISTER EVENT
const registerEvent =
async (req, res) => {

try{

const registration =
new Registration(
req.body
);

await registration.save();

res.json({

message:
"Registered Successfully"

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



// GET USER REGISTRATIONS
const getMyRegistrations =
async (req, res) => {

try{

const email =
req.params.email;

const registrations =
await Registration.find({

userEmail:
email

});

res.json(
registrations
);

}
catch(error){

res.status(500)
.json({
message:
error.message
});

}

};


module.exports = {

registerEvent,
getMyRegistrations

};