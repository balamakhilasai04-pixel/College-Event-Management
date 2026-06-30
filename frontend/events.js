let allEvents = [];

const eventsContainer =
document.getElementById(
    "eventsContainer"
);


/* LOAD EVENTS */

async function loadEvents() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/events"
        );

        if (!response.ok) {
            throw new Error(
                "Unable to load events"
            );
        }

        const data =
        await response.json();

        if (Array.isArray(data)) {
            allEvents = data;
        }
        else {
            allEvents = [];
        }

        renderEvents(allEvents);

    }
    catch (error) {

        console.log(
            "Events Error:",
            error
        );

        eventsContainer.innerHTML = `
            <div class="empty-events">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Events
                </h2>

                <p>
                    Please start the backend server
                    and refresh the page.
                </p>

            </div>
        `;
    }
}


/* RENDER EVENTS */

function renderEvents(events) {

    eventsContainer.innerHTML = "";

    if (
        !Array.isArray(events) ||
        events.length === 0
    ) {

        eventsContainer.innerHTML = `
            <div class="empty-events">

                <div class="empty-icon">
                    🎉
                </div>

                <h2>
                    No Events Found
                </h2>

                <p>
                    New college events
                    will appear here soon.
                </p>

            </div>
        `;

        return;
    }

    events.forEach(function(event) {

        const eventCard =
        document.createElement("div");

        eventCard.className =
        "event-card";


        const eventId =
        event._id || "";

        const title =
        event.title || "Untitled Event";

        const category =
        event.category || "General";

        const date =
        event.date || "Date not available";

        const time =
        event.time || "Time not available";

        const venue =
        event.venue || "Venue not available";

        const fee =
        event.registrationFee || 0;

        const description =
        event.description ||
        "Join this exciting college event and be part of the experience.";

        const image =
        event.banner ||
        event.image ||
        "";


        let statusText =
        "Upcoming";

        let statusClass =
        "upcoming";


        if (event.date) {

            const eventDate =
            new Date(event.date);

            const today =
            new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );

            if (
                !isNaN(
                    eventDate.getTime()
                ) &&
                eventDate < today
            ) {

                statusText =
                "Completed";

                statusClass =
                "completed";
            }
        }


        let imageHTML = "";

        if (image) {

            imageHTML = `
                <img
                    src="${image}"
                    alt="${title}"
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
        }
        else {

            imageHTML = `
                <div
                    class="event-image-fallback"
                >
                    🎉
                </div>
            `;
        }


        eventCard.innerHTML = `

            <div class="event-image-area">

                ${imageHTML}

                <span class="event-category">
                    ${category}
                </span>

                <span
                    class="event-status ${statusClass}"
                >
                    ${statusText}
                </span>

            </div>


            <div class="event-content">

                <h2>
                    ${title}
                </h2>

                <p class="event-description">
                    ${description}
                </p>

                <div class="event-details">

                    <p>
                        📅 ${date}
                    </p>

                    <p>
                        🕒 ${time}
                    </p>

                    <p>
                        📍 ${venue}
                    </p>

                    <p>
                        💰 ₹${fee}
                    </p>

                </div>

                <button
                    class="view-details-btn"
                    onclick="viewDetails('${eventId}')"
                >
                    View Details →
                </button>

            </div>

        `;

        eventsContainer.appendChild(
            eventCard
        );

    });
}


/* SEARCH AND FILTER */

function filterEvents() {

    const searchInput =
    document.getElementById(
        "searchInput"
    );

    const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


    const searchValue =
    searchInput.value
    .trim()
    .toLowerCase();


    const categoryValue =
    categoryFilter.value
    .trim()
    .toLowerCase();


    const filteredEvents =
    allEvents.filter(function(event) {

        const title =
        String(
            event.title || ""
        )
        .toLowerCase();


        const venue =
        String(
            event.venue || ""
        )
        .toLowerCase();


        const category =
        String(
            event.category || ""
        )
        .toLowerCase();


        const searchMatch =

        searchValue === ""

        ||

        title.includes(
            searchValue
        )

        ||

        venue.includes(
            searchValue
        );


        const categoryMatch =

        categoryValue === "all"

        ||

        category ===
        categoryValue;


        return (
            searchMatch &&
            categoryMatch
        );

    });


    renderEvents(
        filteredEvents
    );
}


/* VIEW EVENT DETAILS */

function viewDetails(id) {

    if (!id) {

        alert(
            "Event ID not found"
        );

        return;
    }

    window.location.href =
    "/frontend/event-details/index.html?id="
    + id;
}


/* SEARCH BUTTON */

const searchBtn =
document.getElementById(
    "searchBtn"
);

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        filterEvents
    );
}


/* SEARCH WHEN ENTER KEY IS PRESSED */

const searchInput =
document.getElementById(
    "searchInput"
);

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                filterEvents();
            }
        }
    );
}


/* FILTER WHEN CATEGORY CHANGES */

const categoryFilter =
document.getElementById(
    "categoryFilter"
);

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterEvents
    );
}


/* START PAGE */

loadEvents();