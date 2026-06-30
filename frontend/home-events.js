const homeEvents =
document.getElementById(
"homeEvents"
);


async function
loadHomeEvents(){

try{

const response =
await fetch(
"http://localhost:5000/api/events"
);

const events =
await response.json();


// Show only latest 3 events

const latestEvents =
events.slice(0,3);


homeEvents.innerHTML =
"";


if(latestEvents.length
=== 0){

homeEvents.innerHTML =

`
<div class="glass-card">

<h3>

No Events Yet

</h3>

<p>

Upcoming events
will appear here

</p>

</div>
`;

return;

}


latestEvents.forEach(
(event)=>{

homeEvents.innerHTML +=

`
<div class="glass-card">

<h3>

🎉
${event.title}

</h3>

<p>

📍
${event.venue}

</p>

<p>

📅
${event.date}

</p>

<p>

💰 ₹
${event.registrationFee
|| 0}

</p>

<button
onclick=
"viewEvent(
'${event._id}'
)">

View Details

</button>

</div>
`;

});

}
catch(error){

console.log(error);

}

}



// Open Event Details

function
viewEvent(id){

window.location.href =

"/frontend/event-details/?id="
+ id
+ "&visitor=true";

}
loadHomeEvents();