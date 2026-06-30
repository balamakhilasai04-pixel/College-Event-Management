const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");


// REGISTER USER

const registerUser =
async (req, res) => {

try{

const {
name,
email,
phone,
password,
role
} = req.body;


const existingUser =
await User.findOne({
email
});

if(existingUser){

return res
.status(400)
.json({

message:
"User already exists"

});

}


const hashedPassword =
await bcrypt.hash(
password,
10
);


const user =
new User({

name,
email,
phone,

password:
hashedPassword,

role

});

await user.save();

res.status(201)
.json({

message:
"Registration Successful"

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




// LOGIN USER

const loginUser =
async (req, res) => {

try{

const {
email,
password
} = req.body;


const user =
await User.findOne({
email
});

if(!user){

return res
.status(404)
.json({

message:
"User not found"

});

}


const isMatch =
await bcrypt.compare(
password,
user.password
);

if(!isMatch){

return res
.status(400)
.json({

message:
"Invalid Password"

});

}


const token =
jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);


res.json({

message:
"Login successful",

token,

user:{

name:
user.name,

email:
user.email,

phone:
user.phone,

role:
user.role

}

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




// FORGOT PASSWORD

const forgotPassword =
async (req, res) => {

try{

const {
email,
newPassword
} = req.body;


const user =
await User.findOne({
email
});

if(!user){

return res
.status(404)
.json({

message:
"User not found"

});

}


const hashedPassword =
await bcrypt.hash(
newPassword,
10
);


user.password =
hashedPassword;

await user.save();

res.json({

message:
"Password Updated"

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




// CHANGE PASSWORD

const changePassword =
async (req, res) => {

try{

const {
email,
currentPassword,
newPassword
} = req.body;


if(
!email ||
!currentPassword ||
!newPassword
){

return res
.status(400)
.json({

message:
"Email, current password and new password are required"

});

}


if(
newPassword.length < 6
){

return res
.status(400)
.json({

message:
"New password must be at least 6 characters"

});

}


const user =
await User.findOne({
email
});

if(!user){

return res
.status(404)
.json({

message:
"User not found"

});

}


const isCurrentPasswordCorrect =
await bcrypt.compare(
currentPassword,
user.password
);

if(
!isCurrentPasswordCorrect
){

return res
.status(400)
.json({

message:
"Current password is incorrect"

});

}


const hashedNewPassword =
await bcrypt.hash(
newPassword,
10
);


user.password =
hashedNewPassword;

await user.save();


res.json({

message:
"Password changed successfully"

});

}
catch(error){

console.log(
"Change Password Error:",
error
);

res.status(500)
.json({

message:
error.message

});

}

};

// UPDATE PROFILE

const updateProfile =
async (req, res) => {

try{

const {
email,
name,
phone
} = req.body;


if(
!email ||
!name
){

return res
.status(400)
.json({

message:
"Email and name are required"

});

}


const user =
await User.findOne({
email
});


if(!user){

return res
.status(404)
.json({

message:
"User not found"

});

}


user.name =
name;

user.phone =
phone || "";


await user.save();


res.json({

message:
"Profile updated successfully",

user:{

name:
user.name,

email:
user.email,

phone:
user.phone,

role:
user.role

}

});

}
catch(error){

console.log(
"Update Profile Error:",
error
);

res.status(500)
.json({

message:
error.message

});

}

};


// EXPORT

module.exports = {

registerUser,
loginUser,
forgotPassword,
changePassword,
updateProfile

};