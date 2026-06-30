const params =
new URLSearchParams(
window.location.search
);

const eventId =
params.get("id");

async function
loadEvent(){

const response =
await fetch(
"http://localhost:5000/api/events"
);

const events =
await response.json();

const event =
events.find(
(e)=>e._id === eventId
);

if(!event){

alert("Event Not Found");

return;
}

document.getElementById(
"title"
).value =
event.title;

document.getElementById(
"description"
).value =
event.description;

document.getElementById(
"category"
).value =
event.category;

document.getElementById(
"venue"
).value =
event.venue;

document.getElementById(
"date"
).value =
event.date;

document.getElementById(
"time"
).value =
event.time;

document.getElementById(
"capacity"
).value =
event.capacity || 0;
}

document
.getElementById(
"editEventForm"
)
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const updatedEvent = {

title:
document.getElementById(
"title"
).value,

description:
document.getElementById(
"description"
).value,

category:
document.getElementById(
"category"
).value,

venue:
document.getElementById(
"venue"
).value,

date:
document.getElementById(
"date"
).value,

time:
document.getElementById(
"time"
).value,

capacity:
document.getElementById(
"capacity"
).value

};

try{

const response =
await fetch(

"http://localhost:5000/api/events/" + eventId,

{
method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
updatedEvent
)
}
);

const data =
await response.json();

alert(
data.message ||
"Event Updated"
);

window.location.href =
"/frontend/events/";

}
catch(error){

console.log(error);

alert(
"Update Failed"
);

}

});

loadEvent();
