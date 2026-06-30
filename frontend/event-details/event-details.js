const params =
new URLSearchParams(
window.location.search
);
const isVisitor =
params.get("visitor") === "true";


const eventId =
params.get("id");

console.log(
"URL Event ID:",
eventId
);

async function
loadEventDetails(){

try{

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
console.log("eventId =", eventId);
console.log("events =", events);
console.log("event =", event);

if(!event){

document
.getElementById(
"eventDetails"
)
.innerHTML =
"<h2>Event Not Found</h2>";

return;

}
const savedUser =
JSON.parse(
localStorage.getItem(
"user"
)
);

const user =
isVisitor
?
null
:
savedUser;
console.log(
"EVENT DETAILS USER =",
user
);
console.log("Current User:", user);

document
.getElementById(
"eventDetails"
)
.innerHTML =

` <img
src="${event.banner}"
class="event-banner">


<h2>
${event.title}
</h2>

<p>
<strong>Description:</strong>
${event.description}
</p>

<p>
<strong>Category:</strong>
${event.category}
</p>

<p>
<strong>Venue:</strong>
${event.venue}
</p>

<p>
<strong>Date:</strong>
${event.date}
</p>

<p>
<strong>Time:</strong>
${event.time}
</p>

<p>
<strong>Registration Cost:</strong>
₹${event.registrationFee || 0}
</p>

<p>
<strong>Total Seats:</strong>
${event.capacity}
</p>

<p id="seatsLeft">
Loading...
</p>

<p>
<strong>Highlights:</strong>
${
Array.isArray(event.highlights)
?
event.highlights.join(", ")
:
"None"
}
</p>

<p>
<strong>Coordinator:</strong>
${event.coordinatorName}
</p>

<p>
<strong>Phone:</strong>
${event.coordinatorPhone}
</p>

<div id="actionButtons">
</div>


`;



const actionButtons =
document.getElementById(
"actionButtons"
);

let alreadyRegistered =
false;

let seatsLeft = 0;

{

const regResponse =
await fetch(
"http://localhost:5000/api/registrations"
);

const registrations =
await regResponse.json();

const registeredCount =
registrations.filter(
(reg)=>
reg.eventId === event._id
).length;

seatsLeft =
event.capacity -
registeredCount;

document.getElementById(
"seatsLeft"
).innerHTML =

`<strong>Seats Left:</strong>
${seatsLeft}`;

if(user){

alreadyRegistered =
registrations.some(
(reg)=>

reg.eventId ===
event._id

&&

reg.userEmail ===
user.email
);

}
console.log(
"alreadyRegistered =",
alreadyRegistered
);

}

if(
user &&
user.role ===
"participant"
){
    if(seatsLeft <= 0){

actionButtons.innerHTML =

`
<button
class="registered-btn"
disabled>

❌ Event Full

</button>
`;

return;

}

if(user){

actionButtons.innerHTML =

alreadyRegistered

?

`<button
class="registered-btn"
disabled>

✓ Already Registered

</button>`

:

`<button
onclick=
"registerEvent(
'${event._id}',
'${event.title}'
)">

Register

</button>`;

}
else{

actionButtons.innerHTML =

`<button
onclick=
"registerEvent(
'${event._id}',
'${event.title}'
)">

Register

</button>`;

}

}


else if(
user &&
user.role ===
"organizer"
){

actionButtons.innerHTML =

`

<div class="organizer-actions">
<button
class="edit-btn"
onclick=
"editEvent(
'${event._id}'
)">

✏️ Edit Event

</button>

<button
class="delete-btn"
onclick=
"deleteEvent(
'${event._id}'
)">

🗑️ Delete Event

</button>

</div>
`;

}
else{

actionButtons.innerHTML =

`<button
onclick=
"registerEvent(
'${event._id}',
'${event.title}'
)">

Register

</button>`;

}
console.log("Current User:", user);

}
catch(error){

console.log(
"Load Event Error:",
error
);

}

}

async function
registerEvent(
id,
eventName
){

try{

const savedUser =
JSON.parse(
localStorage.getItem(
"user"
)
);

const user =
isVisitor
?
null
:
savedUser;

let userName;
let userEmail;
let userPhone;

if(user){

userName =
user.name;

userEmail =
user.email;

userPhone =
user.phone;

}
else{

userName =
prompt(
"Enter Your Name"
);

userEmail =
prompt(
"Enter Your Email"
);

userPhone =
prompt(
"Enter Your Phone Number"
);

if(
!userName ||
!userEmail
){

alert(
"Name and Email are required"
);

return;

}

}
const response =
await fetch(
"http://localhost:5000/api/registrations",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

eventId:id,

eventName:eventName,

userName:userName,

userEmail:userEmail,

phone:userPhone

})
}
);

const data =
await response.json();

alert(
data.message
);

loadEventDetails();

}
catch(error){

console.log(error);

}

}

async function
deleteEvent(id){

if(
!confirm(
"Delete this event?"
)
){
return;
}

try{

const response =
await fetch(
"http://localhost:5000/api/events/"
+ id,
{
method:"DELETE"
}
);

const data =
await response.json();

alert(
data.message
);

window.location.href =
"/frontend/events/";

}
catch(error){

console.log(error);

alert(
"Delete Failed"
);

}

}
function editEvent(id) {

    window.location.href =
    `/frontend/edit-event/?id=${id}`;

}


loadEventDetails();
