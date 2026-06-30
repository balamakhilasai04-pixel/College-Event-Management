const table =
document.getElementById(
"registrationTable"
);

const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

// Load Registrations

async function
loadRegistrations(){

try{

const response =
await fetch(
"http://localhost:5000/api/registrations"
);

let registrations =
await response.json();

// Participant → only own registrations

if(
user.role ===
"participant"
){

registrations =
registrations.filter(
(reg)=>

reg.userEmail ===
user.email
);

}

table.innerHTML =
"";

if(
registrations.length === 0
){

table.innerHTML =

`

<tr>

<td colspan="5"
style="
text-align:center;
padding:30px;
color:white;
">

No Registrations Found

</td>

</tr>
`;

return;

}
const eventsResponse =
await fetch(
"http://localhost:5000/api/events"
);

const events =
await eventsResponse.json();

registrations =
registrations.filter(
(reg)=>

events.some(
(event)=>

event._id ===
reg.eventId
)
);
registrations.forEach(
(reg)=>{

table.innerHTML +=

`

<tr>

<td>
${reg.eventName}
</td>

<td>
${reg.userName}
</td>

<td>
${reg.userEmail}
</td>

<td>
${reg.phone || "N/A"}
</td>

<td>

<button
onclick=
"deleteRegistration(
'${reg._id}'
)">

Delete

</button>

</td>

</tr>
`;

});

}
catch(error){

console.log(error);

alert(
"Failed to load registrations"
);

}

}

// Delete Registration

async function
deleteRegistration(id){

try{

const response =
await fetch(

"http://localhost:5000/api/registrations/"

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

loadRegistrations();

}
catch(error){

console.log(error);

alert(
"Delete Failed"
);

}

}

loadRegistrations();
if(
user.role ===
"participant"
){

document
.getElementById(
"pageTitle"
)

.innerText =

"My Registrations";

}
else{

document
.getElementById(
"pageTitle"
)

.innerText =

"All Registrations";

}
function goDashboard() {
    window.location.href = "/frontend/dashboard/";
}

function goToEvents() {
    window.location.href = "/frontend/events/";
}

function goSettings() {
    window.location.href = "/frontend/settings/";
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/frontend/login/";
}
