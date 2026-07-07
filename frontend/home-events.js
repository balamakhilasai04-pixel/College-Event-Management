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

const latestEvents = events;


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


latestEvents.forEach((event)=>{

    let imageHTML = "";

    if(event.banner || event.image){

        imageHTML = `
            <img
                src="${event.banner || event.image}"
                alt="${event.title}"
                class="event-image"
                onerror="
                this.style.display='none';
                this.nextElementSibling.style.display='flex';
                "
            >

            <div
                class="event-image-fallback"
                style="display:none;"
            >
                🎉
            </div>
        `;

    }else{

        imageHTML = `
            <div class="event-image-fallback">
                🎉
            </div>
        `;

    }

    homeEvents.innerHTML += `

    <div class="event-card">

        <div class="event-image-area">

            ${imageHTML}

            <span class="event-category">
                ${event.category || "General"}
            </span>

        </div>

        <div class="event-content">

            <h2>
                ${event.title}
            </h2>

            <p class="event-description">
                ${event.description}
            </p>

            <div class="event-details">

                <p>
                    📅 ${event.date}
                </p>

                <p>
                    🕒 ${event.time}
                </p>

                <p>
                    📍 ${event.venue}
                </p>

                <p>
                    💰 ₹${event.registrationFee || 0}
                </p>

            </div>

            <button
                class="view-details-btn"
                onclick="viewEvent('${event._id}')">

                View Details →

            </button>

        </div>

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