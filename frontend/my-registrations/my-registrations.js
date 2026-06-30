const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

async function
loadMyRegistrations(){

try{

const response =
await fetch(
"http://localhost:5000/api/registrations"
);

const registrations =
await response.json();

const myRegistrations =

registrations.filter(
(reg)=>

reg.userEmail ===
user.email
);

const table =
document.getElementById(
"myRegistrationTable"
);

table.innerHTML =
"";

if(
myRegistrations.length === 0
){

table.innerHTML =

`
<tr>

<td colspan="4">

No Registrations Found

</td>

</tr>
`;

return;

}

myRegistrations.forEach(
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
${reg.phone}
</td>

</tr>
`;

});

}
catch(error){

console.log(error);

}

}

loadMyRegistrations();
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