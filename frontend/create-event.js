const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

if(
!user ||
user.role !==
"organizer"
){

alert(
"Access Denied"
);

window.location.href =
"/frontend/dashboard/";

}
const form =
document.getElementById(
"eventForm"
);

form.addEventListener(
"submit",

async(e)=>{

e.preventDefault();

const selectedHighlights =
[];

document
.querySelectorAll(
'input[name="highlight"]:checked'
)

.forEach((item)=>{

selectedHighlights.push(
item.value
);

});

const eventData = {

title:
document.getElementById(
"title"
).value,


banner:
document.getElementById(
"banner"
).value,

category:
document.getElementById(
"category"
).value,

date:
document.getElementById(
"date"
).value,

time:
document.getElementById(
"time"
).value,

venue:
document.getElementById(
"venue"
).value,

registrationFee:
document.getElementById(
"registrationFee"
).value,

description:
document.getElementById(
"description"
).value,

highlights:
selectedHighlights,

coordinatorName:
document.getElementById(
"coordinatorName"
).value,

coordinatorPhone:
document.getElementById(
"coordinatorPhone"
).value,

capacity:
document.getElementById(
"capacity"
).value

};

try{

const response =
await fetch(
"http://localhost:5000/api/events",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
eventData
)
}
);

if(response.ok){

alert(
"Event Created Successfully"
);

window.location.href =
"/frontend/events";

}
else{

alert(
"Failed to Create Event"
);

}

}
catch(error){

console.log(error);

alert(
"Something went wrong"
);

}

});